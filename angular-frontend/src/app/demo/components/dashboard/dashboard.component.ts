import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/products';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ApiService } from '../../service/api.service';
import { Transaction } from '../../api/transaction';
import { User } from '../../api/users';
import { Company } from '../../api/company';
import * as ss from 'simple-statistics';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];

    transactions: Transaction[] = [];

    userData?: User;

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    CompanyData?: Company;

    subcompanies_amount = 0;

    barData: any;

    pending_orders: number = 0;
    delivered_orders: number = 0;

    barOptions: any;

    transactionsByMonth: Map<number, number> = new Map();
    transactionsByMonthLast: Map<number, number> = new Map();

    transactionActualYear: number[] = [];
    transactionLastYear: number[] = [];
    transactionsActualMonth: Transaction[] = [];
    datapredicting:number[]=[];
    items2: any[] = [];

    constructor(
        private productService: ProductService,
        private _api: ApiService,
        public layoutService: LayoutService
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];
        this._api.getTypeRequest('users/validate').subscribe(
            (user: any) => {
                this.userData = user;
                this._api
                    .getAllByIdTypeRequest(
                        'transactions/transactionsid',
                        this.userData?.Company_id ?? 0
                    )
                    .subscribe(
                        (data: any) => {
                            this.transactions = data;
                            this.pending_orders = this.transactions.filter(
                                (transaction) =>
                                    transaction.Tran_status === 'not_done'
                            ).length;
                            this.delivered_orders = this.transactions.filter(
                                (transaction) =>
                                    transaction.Tran_status === 'done'
                            ).length;
                            this.dahsboardTransactions();
                            this.selling_Products();
                            this.initChart();
                        },
                        (err) => {}
                    );
                this._api
                    .getByIdTypeRequest(
                        'companies',
                        this.userData?.Company_id ?? 0
                    )
                    .subscribe(
                        (company: any) => {
                            this.CompanyData = company;
                            this.subcompanies_amount =
                                this.CompanyData?.Children_comp?.length ?? 0;
                        },
                        (err: any) => {
                            console.log(err);
                        }
                    );
            },
            (err: any) => {}
        );
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            datasets: [
                {
                    label: 'Sales Value Prediction',
                    data: this.datapredicting,
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                }
                
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
        this.barData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            datasets: [
                {
                    label: 'Actual Year',
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    borderColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    data: this.transactionActualYear,
                },
                {
                    label: 'Last Year',
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-200'),
                    borderColor:
                        documentStyle.getPropertyValue('--primary-200'),
                    data: this.transactionLastYear,
                },
            ],
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500,
                        },
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    dahsboardTransactions() {
        if (this.transactions) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();

            const currentYearTransactions: Transaction[] = [];
            const previousYearTransactions: Transaction[] = [];

            for (const transaction of this.transactions) {
                const transactionYear = new Date(
                    transaction.Tran_date!
                ).getFullYear();

                if (transactionYear === currentYear) {
                    currentYearTransactions.push(transaction);
                } else if (transactionYear === currentYear - 1) {
                    previousYearTransactions.push(transaction);
                }
            }

            this.transactionsByMonth = new Map();
            console.log(currentYearTransactions);
            this.trendGraph(currentYearTransactions);
            this.transactionsByMonthLast = new Map();

            // Inicializar el mapa con cero transacciones para cada mes
            for (let month = 1; month <= 12; month++) {
                this.transactionsByMonth.set(month, 0);
                this.transactionsByMonthLast.set(month, 0);
            }

            // Contar las transacciones por mes en el año actual
            for (const transaction of currentYearTransactions) {
                const transactionMonth =
                    new Date(transaction.Tran_date!).getMonth() + 1;
                this.transactionsByMonth.set(
                    transactionMonth,
                    this.transactionsByMonth.get(transactionMonth)! + 1
                );
            }

            // Contar las transacciones por mes en el año anterior
            for (const transaction of previousYearTransactions) {
                const transactionMonth =
                    new Date(transaction.Tran_date!).getMonth() + 1;
                this.transactionsByMonthLast.set(
                    transactionMonth,
                    this.transactionsByMonthLast.get(transactionMonth)! + 1
                );
            }

            this.transactionActualYear = Array.from(
                this.transactionsByMonth.values()
            );
            this.transactionLastYear = Array.from(
                this.transactionsByMonthLast.values()
            );
        }
    }

    selling_Products() {
        if (this.transactions) {
            const currentDate = new Date();

            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            this.transactionsActualMonth = this.transactions.filter(
                (transaccion) => {
                    const fechaTransaccion = new Date(transaccion.Tran_date!);
                    const year = fechaTransaccion.getFullYear();
                    const month = fechaTransaccion.getMonth() + 1;
                    return year === currentYear && month === currentMonth;
                }
            );

            // console.log(this.transactionsActualMonth);

            const conteoProductos = new Map<
                string,
                { cantidad: number; category: string }
            >();

            this.transactionsActualMonth.forEach((transaccion) => {
                transaccion.Transaction_details!.forEach((detalle) => {
                    const producto = detalle.Product?.Pro_name;
                    const cantidad = detalle.Tran_det_mount;
                    const category = detalle.Product?.Category?.Cat_name!;

                    if (producto && cantidad) {
                        if (conteoProductos.has(producto)) {
                            const cantidadExistente =
                                conteoProductos.get(producto) || 0;
                            if (cantidadExistente) {
                                cantidadExistente.cantidad += cantidad;
                                // Actualiza el otro dato si es necesario
                            }
                        } else {
                            conteoProductos.set(producto, {
                                cantidad,
                                category,
                            });
                        }
                    }
                });
            });

            // console.log(conteoProductos);
            const productosOrdenados = Array.from(conteoProductos.entries())
                .sort((a, b) => b[1].cantidad - a[1].cantidad)
                .slice(0, 5);

            for (const [producto, datos] of productosOrdenados) {
                const cantidad = datos.cantidad;
                const category = datos.category;

                const item = {
                    name: producto,
                    category: category,
                    progress: cantidad,
                };

                this.items2.push(item);
            }
        }
    }

    trendGraph(transaccionYear: Transaction[]) {

        
        var transactionsByMonth = new Map();
        

        // Inicializar el mapa con cero ventas para cada mes
        for (let month = 1; month <= 12; month++) {
            transactionsByMonth.set(month, 0);
        }
        
        for (const transaction of transaccionYear) {
            const transactionMonth =
                new Date(transaction.Tran_date!).getMonth() + 1;
            transactionsByMonth.set(
                transactionMonth,
                transactionsByMonth.get(transactionMonth)! +
                    transaction.Tran_Total
            );
        }
        
        const transactionsByMonthcopy = new Map(transactionsByMonth);
        console.log(transactionsByMonth);
        for (let [mes, venta] of transactionsByMonth) {
            // Si la venta es igual a 0, eliminar la entrada del Map
            if (venta === 0) {
                transactionsByMonth.delete(mes);
            }
        }
       
        const ventas = Array.from(transactionsByMonth).sort(
            (a, b) => a[0] - b[0]
        );
        const meses = ventas.map((v) => v[0]);
        const totalesVentas = ventas.map((v) => v[1]);


        // Calcular la línea de tendencia
        const regresionLineal = ss.linearRegression(ventas);
        const lineaTendencia = meses.map(
            (i) => regresionLineal.m * i + regresionLineal.b
        );

        // Predecir ventas para los próximos meses
        const predicciones = [];

        for (let i = meses.length + 1; i <= 12; i++) {

            const prediccion = regresionLineal.m * i + regresionLineal.b;

            predicciones.push(prediccion);
        }
        let count=0
        for (let [mes, venta] of transactionsByMonthcopy) {
            // Si la venta es igual a 0, eliminar la entrada del Map
            if (venta === 0) {
                transactionsByMonthcopy.set(mes, predicciones[count]);
                count++
            }
        }
        this.datapredicting = Array.from(
            transactionsByMonthcopy.values()
        );

    }
}
