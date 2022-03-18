<template>
	<div>
		<div class="header">
			<v-card class="mx-auto my-12" min-width="100%">
				<v-expansion-panels>
					<v-expansion-panel>
						<v-expansion-panel-header>
							<v-card-title>
								<v-row>
									<v-col lg="1" sm="1" md="1">
										<v-icon left style="color: purple;">mdi-filter</v-icon>
									</v-col>
									<v-col lg="11" sm="11" md="11">
										<span>{{ 'Filter' }}</span>
									</v-col>
								</v-row>
							</v-card-title>
						</v-expansion-panel-header>

						<v-expansion-panel-content>
							<v-card-text>
								<v-container>
									<v-row>
										<v-col lg="1" sm="1" md="1">
											<v-switch v-model="filter.isCheck.category_name" color="purple" />
										</v-col>
										<v-col lg="11" sm="11" md="11">
											<v-text-field
												v-model="filter.category_name"
												label="Category Name"
												clearable
												:disabled="!filter.isCheck.category_name"
												prepend-inner-icon="mdi-library"
											/>
										</v-col>
									</v-row>

									<v-row>
										<v-col lg="1" sm="1" md="1">
											<v-switch v-model="filter.isCheck.created_date" color="purple" />
										</v-col>
										<v-col lg="11" sm="11" md="11">
											<v-menu
												ref="created_date_menu"
												v-model="created_date_menu"
												:close-on-content-click="false"
												transition="scale-transition"
												offset-y
												max-width="290px"
												min-width="auto"
											>
												<template v-slot:activator="{ on, attrs }">
													<v-text-field
														:value="filter.created_date"
														label="Created Date"
														hint="YYYY-mm-dd"
														persistent-hint
														prepend-inner-icon="mdi-calendar"
														v-bind="attrs"
														clearable
														readonly
														v-on="on"
													/>
												</template>
												<v-date-picker
													v-if="filter.isCheck.created_date === true"
													v-model="filter.created_date"
													no-title
													:max="filter.expired_date"
													@input="created_date_menu = false"
												/>
											</v-menu>
										</v-col>
									</v-row>

									<v-row>
										<v-col lg="1" sm="1" md="1">
											<v-switch v-model="filter.isCheck.expired_date" color="purple" />
										</v-col>
										<v-col lg="11" sm="11" md="11">
											<v-menu
												ref="expired_date_menu"
												v-model="expired_date_menu"
												:close-on-content-click="false"
												transition="scale-transition"
												offset-y
												max-width="290px"
												min-width="auto"
											>
												<template v-slot:activator="{ on, attrs }">
													<v-text-field
														:value="filter.expired_date"
														label="Expired Date"
														hint="YYYY-mm-dd"
														persistent-hint
														prepend-inner-icon="mdi-calendar"
														v-bind="attrs"
														clearable
														readonly
														v-on="on"
													/>
												</template>
												<v-date-picker
													v-if="filter.isCheck.expired_date === true"
													v-model="filter.expired_date"
													no-title
													:min="filter.created_date"
													@input="expired_date_menu = false"
												/>
											</v-menu>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-row>
									<v-col cols="12">
										<v-btn
											color="primary"
											class="mx-2"
											@click="doFilter()"
										>
											<v-icon left>mdi-magnify</v-icon>
											<span>{{ 'Apply' }}</span>
										</v-btn>
										<v-btn
											color="error"
											class="mx-2"
											@click="resetFilter()"
										>
											<v-icon left>mdi-eraser</v-icon>
											<span>{{ 'Reset' }}</span>
										</v-btn>
									</v-col>
								</v-row>
							</v-card-actions>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-card>
		</div>

		<v-data-table
			:headers="vFields"
			:items="vItems"
			sort-by="categoryName"
			class="elevation-12"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Category Management</v-toolbar-title>

					<v-divider class="mx-4" inset vertical />

					<v-spacer />

					<v-btn color="primary" dark class="mb-2 btn-register">
						<span class="mdi mdi-window-closed pr-1" />
						<span>New Category</span>
					</v-btn>

					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title>
								<v-row>
									<v-col cols="12" class="text-center">
										<span>Are you sure to delete?</span>
									</v-col>
								</v-row>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												:value="tmpStoreData.category_name"
												label="Category Name"
												readonly
											/>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												:value="tmpStoreData.created_date"
												label="Created Date"
												readonly
											/>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												:value="tmpStoreData.expired_date"
												label="Expired Date"
												readonly
											/>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer />

								<v-btn tile color="success" class="btn" @click="closeDelete()">
									<v-icon left>mdi-delete-empty</v-icon>
									<span>Cancel</span>
								</v-btn>

								<v-btn tile color="success" class="btn confirm" @click="deleteItemConfirm()">
									<v-icon left>mdi-delete-empty</v-icon>
									<span>OK</span>
								</v-btn>
								<v-spacer />
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<v-icon normal class="mr-2" style="color: #542E71;">mdi-pencil</v-icon>
				<v-icon normal style="color: #CF0000;" @click="deleteItem(item)">mdi-delete</v-icon>
			</template>

			<template v-slot:no-data>
				<span>Table is Empty</span>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import { getCategory, deleteCategory } from '@/api/modules/category';

import { convertDateToISO } from '@/utils/handleConvertDateFormat';

const URL_GET_CATEGORY = '/admin/category';
const URL_DELETE_CATEGORY = '/qamanager/category';

export default {
    name: 'CategoryManagement',
    data() {
        return {
            convertDateToISO: convertDateToISO,

            filter: {
                category_name: '',
                created_date: '',
                expired_date: '',

                isCheck: {
                    category_name: false,
                    created_date: false,
                    expired_date: false,
                },
            },

            dialogDelete: false,

            vFields: [
                { text: 'Category Name', value: 'categoryName', sortable: true, align: 'center' },
                { text: 'Created Date', value: 'firstClosureDate', sortable: true, align: 'center' },
                { text: 'Expired Date', value: 'finalClosureDate', sortable: true, align: 'center' },
                { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
            ],

            vItems: [],

            created_date_menu: false,
            expired_date_menu: false,

            tmpStoreData: {
                id: '',
                category_name: '',
                created_date: '',
                expired_date: '',
            },
        };
    },

    computed: {
        isCheckCategoryName() {
            return this.filter.isCheck.category_name;
        },

        isCheckCreatedDate() {
            return this.filter.isCheck.created_date;
        },

        isCheckExpiredDate() {
            return this.filter.isCheck.expired_date;
        },
    },

    watch: {
        isCheckCategoryName() {
            this.filter.category_name = '';
        },

        isCheckCreatedDate() {
            this.filter.created_date = '';
        },

        isCheckExpiredDate() {
            this.filter.expired_date = '';
        },
    },

    created() {
        this.getCategoryData();
    },

    methods: {
        async getCategoryData() {
            try {
                const response = await getCategory(URL_GET_CATEGORY);
                if (response.status === true) {
                    const RAW_DATA = [...response.category];
                    for (let i = 0; i < RAW_DATA.length; i++) {
                        RAW_DATA[i].firstClosureDate = convertDateToISO(RAW_DATA[i].firstClosureDate);
                        RAW_DATA[i].finalClosureDate = convertDateToISO(RAW_DATA[i].finalClosureDate);
                    }
                    this.vItems = RAW_DATA;
                }
            } catch (error) {
                console.log(error.message);
            }
        },

        doFilter() {
            //
        },

        deleteItem(item) {
            this.dialogDelete = true;

            this.tmpStoreData = {
                id: item._id,
                category_name: item.categoryName,
                created_date: item.firstClosureDate,
                expired_date: item.finalClosureDate,
            };
        },

        closeDelete() {
            this.dialogDelete = false;

            this.tmpStoreData = {
                id: '',
                category_name: '',
                created_date: '',
                expired_date: '',
            };
        },

        async deleteItemConfirm() {
            try {
                const URL = `${URL_DELETE_CATEGORY}/${this.tmpStoreData.id}`;
                const response = await deleteCategory(URL);
                console.log(response);
            } catch (error) {
                console.log(error.message);
            }
        },

        resetFilter() {
            this.filter.isCheck = {
                category_name: false,
                created_date: false,
                expired_date: false,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    @import '@/scss/variables.scss';

    .btn {
        min-width: 110px !important;
        font-weight: bold;
    }

    .confirm {
        background-color: #FF1818 !important;
        border: none !important;
    }
</style>
