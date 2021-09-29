import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  Category,
  Ingredient,
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

export type CommonAdmimItem = UserDTO | Category | Product | Ingredient;
export type CommotAdminUrlType = 'category' | 'product' | 'user' | 'ingredient';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  public store$: Observable<MainState>;
  public showButton: boolean = true;
  public typeId!: CommotAdminUrlType;

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
        tap((i) => (this.typeId = i.typeId)),
        switchMap((i) => {
          switch (i.typeId as CommotAdminUrlType) {
            case 'category':
            case 'ingredient':
            case 'product':
              return this.store$.pipe(
                tap((store) => {
                  this.storeSelectHandler(store, i.typeId);
                  this.showButton = true;
                })
              );
            case 'user':
              return this.adminService.getUsers().pipe(
                tap((users) => {
                  this.items = users;
                  this.showButton = false;
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

  public clickHandler(item: CommonAdmimItem): void {
    if (this.typeId == 'product') this.chooseProduct(item as Product);
    if (this.typeId == 'category') this.chooseCategory(item as Category);
    if (this.typeId == 'ingredient') this.chooseIngredient(item as Ingredient);
  }

  public createNewItem(): void {
    if (this.typeId == 'product') this.createNewProduct();
    if (this.typeId == 'category') this.createNewCategory();
    if (this.typeId == 'ingredient') this.createNewIngredient();
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
