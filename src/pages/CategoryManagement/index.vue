<template>
	<div class="category-screen">
		<v-data-table
			:headers="vFields"
			:items="vItems"
			class="elevation-12 table-category-list"
			:search="search"
		>
			<template v-slot:top>
				<v-toolbar flat elevation="6">
					<v-row>
						<v-col cols="6" class="text-left">
							<v-toolbar-title>Category Management</v-toolbar-title>
						</v-col>

						<v-col cols="6" class="text-center">
							<v-text-field
								v-model="search"
								append-icon="mdi-magnify"
								label="Search"
								single-line
								hide-details
							/>
						</v-col>
					</v-row>
				</v-toolbar>

				<v-row class="mt-3">
					<v-col cols="12" class="text-center">
						<v-dialog v-model="dialog" max-width="500px" persistent>
							<template v-slot:activator="{ on, attrs }">
								<v-btn v-if="role !== 'Quality Assurance Coordinator' && role !== 'Staff'" color="primary" dark class="mb-2 open-register-modal-btn" v-bind="attrs" v-on="on">
									<v-icon left>mdi-plus-box</v-icon>
									<span>New Category</span>
								</v-btn>
							</template>
							<v-card>
								<v-card-title>
									<v-row>
										<v-col cols="12" class="text-center">
											<span>{{ formTitle }}</span>
										</v-col>
									</v-row>
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
															label="First Closure Date"
															hint="YYYY-mm-dd"
															persistent-hint
															prepend-inner-icon="mdi-calendar"
															readonly
															v-bind="attrs"
															v-on="on"
														>
															<v-icon
																v-show="add_created_date_menu === true"
																slot="append"
																color="red"
																@click="editedItem.firstClosureDate = ''"
															>mdi-close-box</v-icon>
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
															label="Final Closure Date"
															hint="YYYY-mm-dd"
															persistent-hint
															prepend-inner-icon="mdi-calendar"
															v-bind="attrs"
															readonly
															v-on="on"
														>
															<v-icon
																v-show="add_expired_date_menu === true"
																slot="append"
																color="red"
																@click="editedItem.finalClosureDate = ''"
															>mdi-close-box</v-icon>
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
									<v-btn class="save-btn" color="blue darken-1" text @click="save()">
										<v-icon left>mdi-lead-pencil</v-icon>
										<span>{{ editedIndex === -1 ? "Register" : "Save" }}</span>
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-col>
				</v-row>

				<v-dialog v-model="dialogDelete" max-width="500px">
					<v-card>
						<v-card-title>
							<v-row>
								<v-col cols="12" class="text-center">
									<span>Are you sure to delete this category?</span>
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
											label="Fist Closure Date"
											readonly
											prepend-inner-icon="mdi-calendar"
										/>
									</v-col>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.finalClosureDate"
											label="Final Closure Date"
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
								<v-icon left>mdi-delete-empty</v-icon>
								<span>{{ "Confirm" }}</span>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</template>

			<template v-slot:[`item.firstClosureDate`]="{ item }">
				<span>{{
					item.firstClosureDate | moment("dddd, MM/YYYY, HH:mm A")
				}}</span>
			</template>

			<template v-slot:[`item.finalClosureDate`]="{ item }">
				<span>{{
					item.finalClosureDate | moment("dddd, MM/YYYY, HH:mm A")
				}}</span>
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<v-icon
					v-if="role !== 'Quality Assurance Manager' && role !== 'Quality Assurance Coordinator' && role !== 'Staff'"
					small
					class="mr-2"
					style="color: #051367"
					@click="editItem(item)"
				>mdi-pencil</v-icon>
				<v-icon
					v-if="role !== 'Quality Assurance Coordinator' && role !== 'Staff'"
					small
					style="color: #e84545"
					@click="deleteItem(item)"
				>mdi-delete</v-icon>
			</template>

			<template v-slot:no-data>
				<span>{{ "Table is Empty" }}</span>
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
import {
    getCategory,
    postCategory,
    putCategory,
    deleteCategory,
} from '@/api/modules/category';

// Helper functions import
import { convertDateToISO } from '@/utils/handleConvertDateFormat';
import { MakeToast } from '@/toast/toastMessage';
import { isPassValidation } from './helper';

// Const APIs Url
const URL_GET_CATEGORY = '/category';
const URL_POST_CATEGORY = '/category';
const URL_PUT_CATEGORY = '/category';
const URL_DELETE_CATEGORY = '/category';

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
                {
                    text: 'Category Name',
                    value: 'categoryName',
                    sortable: true,
                    align: 'start',
                },
                { text: 'First Closure Date', value: 'firstClosureDate', sortable: true },
                { text: 'Final Closure Date', value: 'finalClosureDate', sortable: true },
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

        role() {
            return this.$store.getters.role;
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
                    this.$store.dispatch('chart/setTotalCategory', response.category.length);
                    const RAW_DATA = [response.category];
                    for (let i = 0; i < RAW_DATA.length; i++) {
                        RAW_DATA[i].firstClosureDate = convertDateToISO(
                            RAW_DATA[i].firstClosureDate
                        );
                        RAW_DATA[i].finalClosureDate = convertDateToISO(
                            RAW_DATA[i].finalClosureDate
                        );
                    }
                    this.vItems = RAW_DATA[0];
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
                    const response = await postCategory(
                        URL_POST_CATEGORY,
                        this.editedItem
                    );
                    if (response.status === true) {
                        MakeToast({
                            variant: 'success',
                            title: 'Success',
                            content: 'Create New Category Successful',
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
                            content: 'Update Category Successful',
                        });

                        this.getCategoryData();
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        },

        async removeCategory(ID) {
            const URL = `${URL_DELETE_CATEGORY}/${ID}`;
            try {
                const response = await deleteCategory(URL);
                if (response.status === true) {
                    MakeToast({
                        variant: 'success',
                        title: 'Success',
                        content: 'Delete Category Successful',
                    });

                    this.getCategoryData();
                }
            } catch (error) {
                console.log(error.message);
            }
            this.closeDelete();
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
@import "@/scss/variables.scss";

.btn {
  min-width: 110px !important;
  font-weight: bold;
}

.confirm {
  background-color: #ff1818 !important;
  border: none !important;
}
</style>
