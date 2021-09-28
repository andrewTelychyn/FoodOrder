import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  Category,
  Ingredient,
  MainType,
  Product,
} from 'src/app/shared/models/product.model';
import { v4 as uuid } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { AdminProductComponent } from 'src/app/components/admin-modal-dialog/admin-product/admin-product.component';
import { AdminIngredientComponent } from 'src/app/components/admin-modal-dialog/admin-ingredient/admin-ingredient.component';
import { AdminCategoryComponent } from 'src/app/components/admin-modal-dialog/admin-category/admin-category.component';
import { MainState } from 'src/app/store/shared/store.model';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';
import { UserDTO } from 'src/app/shared/models/user.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  public store$: Observable<MainState>;
  public users: UserDTO[] = [];

  public items: any[] = [];

  private readonly typeToStoreMap: { [key: string]: keyof MainState } = {
    category: 'categories',
    ingredient: 'ingredients',
    product: 'products',
  };

  constructor(
    private matDialog: MatDialog,
    private store: Store<{ main: MainState }>,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {
    this.store$ = this.store.select('main');

    this.route.params
      .pipe(
        filter((i) => i.typeId),
        switchMap((i) => {
          switch (i.typeId) {
            case 'category':
            case 'ingredient':
            case 'product':
              return this.store$.pipe(
                tap((store) => this.storeSelectHandler(store, i.typeId))
              );
            case 'user':
              return this.adminService.getUsers().pipe(
                tap((users) => {
                  this.items = users;
                })
              );
            default:
              this.router.navigate(['/admin/product']);
              return of(i);
          }
        })
      )
      .subscribe(() => {});
  }

  private storeSelectHandler(store: MainState, typeId: string): void {
    const key = this.typeToStoreMap[typeId];
    this.items = store[key]['items'];
  }

  public chooseItem(item: any): void {
    if ('img' in item) this.chooseProduct(item as Product);
    if ('icon' in item) this.chooseCategory(item as Category);
    if ('optionCal' in item) this.chooseIngredient(item as Ingredient);
  }

  public createNewItem(): void {
    let item = this.items[0];

    if ('img' in item) this.createNewProduct();
    if ('icon' in item) this.createNewCategory();
    if ('optionCal' in item) this.createNewIngredient();
  }

  private createNewProduct(): void {
    const value: Product = {
      name: '',
      img: '',
      cost: 0,
      ingredientIds: [],
      categoryIds: [],
      id: uuid(),
    };

    this.matDialog.open(AdminProductComponent, {
      data: { product: value },
    });
  }

  private createNewIngredient(): void {
    let value: Ingredient = {
      optionCal: 0,
      name: '',
      cost: 0,
      id: uuid(),
    };

    this.matDialog.open(AdminIngredientComponent, {
      data: { ingredient: value },
    });
  }

  private createNewCategory(): void {
    let value: Category = {
      name: '',
      icon: '',
      id: uuid(),
    };

    this.matDialog.open(AdminCategoryComponent, {
      data: { category: value },
    });
  }

  private chooseProduct(product: Product): void {
    this.matDialog.open(AdminProductComponent, { data: { product } });
  }

  private chooseIngredient(ingredient: Ingredient): void {
    this.matDialog.open(AdminIngredientComponent, { data: { ingredient } });
  }

  private chooseCategory(category: Category): void {
    this.matDialog.open(AdminCategoryComponent, { data: { category } });
  }
}
