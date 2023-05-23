import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'location', loadChildren: () => import ('./location/location.module').then(m => m.LocationModule) },
    { path: 'employee', loadChildren: () => import ('./employee-m/employee-m.module').then(m => m.EmployeeMModule) },
    { path: 'device', loadChildren: () => import ('./device-m/device-m.module').then(m => m.DeviceMModule) },
    { path: 'tax', loadChildren: () => import ('./tax-m/tax-m.module').then(m => m.TaxMModule) },
    { path: 'category', loadChildren: () => import ('./category-m/category-m.module').then(m => m.CategoryMModule) },
    { path: 'binnacle/:id', loadChildren: () => import ('./binnacle/binnacle.module').then(m => m.BinnacleModule) },
    { path: 'unitMeasure', loadChildren: () => import ('./unitmeasure-m/unitmeasure-m.module').then(m => m.UnitmeasureMModule) },
    { path: 'product', loadChildren: () => import ('./product-m/product-m.module').then(m => m.ProductMModule) },
    { path: 'transaction', loadChildren: () => import ('./transaction-m/transaction-m.module').then(m => m.TransactionMModule) },

    { path: '**', redirectTo: '/notfound' }

  ])],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
