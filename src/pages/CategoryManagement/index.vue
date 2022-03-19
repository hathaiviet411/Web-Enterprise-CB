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
												ref="filter_created_date_menu"
												v-model="filter_created_date_menu"
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
													@input="filter_created_date_menu = false"
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
												ref="filter_expired_date_menu"
												v-model="filter_expired_date_menu"
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
													@input="filter_expired_date_menu = false"
												/>
											</v-menu>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-row>
									<v-col cols="12">
										<v-btn color="primary" class="mx-2" @click="doFilter()">
											<v-icon left>mdi-magnify</v-icon>
											<span>{{ 'Apply' }}</span>
										</v-btn>
										<v-btn color="error" class="mx-2" @click="resetFilter()">
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
			:search="search"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>
						<span>{{ 'Category Management' }}</span>
					</v-toolbar-title>

					<v-divider class="mx-4" inset vertical />

					<v-spacer />

					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						label="Search"
						single-line
						hide-details
					/>

					<v-spacer />

					<v-dialog v-model="dialog" max-width="500px">
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
								<v-icon left>mdi-plus-box</v-icon>
								<span>New Category</span>
							</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span class="text-h5">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.categoryName"
												prepend-inner-icon="mdi-library"
												label="Category Name"
											/>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-menu
												ref="add_created_date_menu"
												v-model="add_created_date_menu"
												:close-on-content-click="false"
												transition="scale-transition"
												offset-y
												max-width="290px"
												min-width="auto"
											>
												<template v-slot:activator="{ on, attrs }">
													<v-text-field
														:value="editedItem.firstClosureDate"
														label="Created Date"
														hint="YYYY-mm-dd"
														persistent-hint
														prepend-inner-icon="mdi-calendar"
														readonly
														v-bind="attrs"
														v-on="on"
													>
														<v-icon v-show="add_created_date_menu === true" slot="append" color="red" @click="editedItem.firstClosureDate = ''">mdi-close-box</v-icon>
													</v-text-field>
												</template>
												<v-date-picker
													v-model="editedItem.firstClosureDate"
													no-title
													:max="editedItem.finalClosureDate"
													@input="add_created_date_menu = false"
												/>
											</v-menu>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-menu
												ref="add_expired_date_menu"
												v-model="add_expired_date_menu"
												:close-on-content-click="false"
												transition="scale-transition"
												offset-y
												max-width="290px"
												min-width="auto"
											>
												<template v-slot:activator="{ on, attrs }">
													<v-text-field
														:value="editedItem.finalClosureDate"
														label="Expired Date"
														hint="YYYY-mm-dd"
														persistent-hint
														prepend-inner-icon="mdi-calendar"
														v-bind="attrs"
														readonly
														v-on="on"
													>
														<v-icon v-show="add_expired_date_menu === true" slot="append" color="red" @click="editedItem.finalClosureDate = ''">mdi-close-box</v-icon>
													</v-text-field>
												</template>
												<v-date-picker
													v-model="editedItem.finalClosureDate"
													no-title
													:min="editedItem.firstClosureDate"
													@input="add_expired_date_menu = false"
												/>
											</v-menu>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer />
								<v-btn color="red darken-1" text @click="close()">
									<v-icon left>mdi-exit-to-app</v-icon>
									<span>Cancel</span>
								</v-btn>
								<v-btn color="blue darken-1" text @click="save()">
									<v-icon left>mdi-lead-pencil</v-icon>
									<span>{{ editedIndex === -1 ? 'Register' : 'Save' }}</span>
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>

					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title>
								<v-row>
									<v-col cols="12" class="text-center">
										<span>Are you sure to delete this item?</span>
									</v-col>
								</v-row>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.categoryName"
												label="Category Name"
												prepend-inner-icon="mdi-library"
												readonly
											/>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.firstClosureDate"
												label="Created Date"
												readonly
												prepend-inner-icon="mdi-calendar"
											/>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.finalClosureDate"
												label="Expired Date"
												readonly
												prepend-inner-icon="mdi-calendar"
											/>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer />
								<v-btn color="blue darken-1" text @click="closeDelete()">
									<v-icon left>mdi-exit-to-app</v-icon>
									<span>Cancel</span>
								</v-btn>
								<v-btn color="red darken-1" text @click="deleteItemConfirm()">
									<v-icon left>mdi-lead-pencil</v-icon>
									<span>{{ 'Confirm' }}</span>
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<v-icon normal class="mr-2" style="color: #051367;" @click="editItem(item)">mdi-pencil</v-icon>
				<v-icon normal style="color: #E84545;" @click="deleteItem(item)">mdi-delete</v-icon>
			</template>

			<template v-slot:no-data>
				<span>{{ 'Table is Empty' }}</span>
			</template>

			<!-- <template v-slot:footer class="mt-3">
				<div class="text-center pb-3 pt-3">
					<v-pagination
						v-model="pagination.currentPage"
						:length="pagination.totalPage"
						circle
					/>
				</div>
			</template> -->
		</v-data-table>
	</div>
</template>

<script>
// APIs import
import { getCategory, postCategory, putCategory, deleteCategory } from '@/api/modules/category';

// Helper functions import
import { convertDateToISO } from '@/utils/handleConvertDateFormat';
import { MakeToast } from '@/toast/toastMessage';
import { isPassValidation } from './helper';

// Const APIs Url
const URL_GET_CATEGORY = '/admin/category';
const URL_POST_CATEGORY = '/admin/category';
const URL_PUT_CATEGORY = '/admin/category';
const URL_DELETE_CATEGORY = '/admin/category';

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

            dialog: false,
            dialogDelete: false,

            vFields: [
                { text: 'Category Name', value: 'categoryName', sortable: true, align: 'start' },
                { text: 'Created Date', value: 'firstClosureDate', sortable: true },
                { text: 'Expired Date', value: 'finalClosureDate', sortable: true },
                { text: 'Actions', value: 'actions', sortable: false },
            ],

            vItems: [],

            filter_created_date_menu: false,
            filter_expired_date_menu: false,

            edit_created_date_menu: false,
            edit_expired_date_menu: false,

            add_created_date_menu: false,
            add_expired_date_menu: false,

            editedIndex: -1,

            editedItem: {
                id: '',
                categoryName: '',
                firstClosureDate: '',
                finalClosureDate: '',
            },

            defaultItem: {
                id: '',
                categoryName: '',
                firstClosureDate: '',
                finalClosureDate: '',
            },

            pagination: {
                currentPage: 1,
                perPage: 10,
                totalPage: 2,
            },

            search: '',
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

        formTitle() {
            return this.editedIndex === -1 ? 'New Category' : 'Edit Category';
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

        dialog(val) {
            val || this.close();
        },

        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    mounted() {
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

        async createNewCategory() {
            if (isPassValidation(this.editedItem) === true) {
                this.close();
                try {
                    const response = await postCategory(URL_POST_CATEGORY, this.editedItem);
                    if (response.status === true) {
                        MakeToast({
                            variant: 'success',
                            title: 'Success',
                            content: 'Create Successful',
                        });

                        this.getCategoryData();
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        },

        async updateCategory(DATA) {
            const URL = `${URL_PUT_CATEGORY}/${DATA.id}`;
            if (isPassValidation(DATA) === true) {
                this.close();
                try {
                    const response = await putCategory(URL, DATA);

                    if (response.status === true) {
                        MakeToast({
                            variant: 'success',
                            title: 'Success',
                            content: 'Update Successful',
                        });

                        this.getCategoryData();
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        },

        async removeCategory(ID) {
            this.closeDelete();
            const URL = `${URL_DELETE_CATEGORY}/${ID}`;
            try {
                const response = await deleteCategory(URL);
                if (response.status === true) {
                    MakeToast({
                        variant: 'success',
                        title: 'Success',
                        content: 'Delete Successful',
                    });

                    this.getCategoryData();
                }
            } catch (error) {
                console.log(error.message);
            }
        },

        editItem(item) {
            this.editedIndex = this.vItems.indexOf(item);
            this.editedItem = {
                id: item._id,
                categoryName: item.categoryName,
                firstClosureDate: convertDateToISO(item.firstClosureDate),
                finalClosureDate: convertDateToISO(item.finalClosureDate),
            };
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.vItems.indexOf(item);
            this.editedItem = {
                id: item._id,
                categoryName: item.categoryName,
                firstClosureDate: convertDateToISO(item.firstClosureDate),
                finalClosureDate: convertDateToISO(item.finalClosureDate),
            };
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.removeCategory(this.editedItem.id);
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                this.updateCategory(this.editedItem);
            } else {
                this.createNewCategory();
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
