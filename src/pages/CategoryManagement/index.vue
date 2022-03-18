<template>
	<div>

		<div class="header">
			<v-card class="mx-auto my-12" min-width="100%">
				<v-card-title>{{ 'Category Management Filter' }}</v-card-title>
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
					</v-container>
				</v-card-text>
			</v-card>
		</div>

		<v-data-table
			:headers="headers"
			:items="desserts"
			sort-by="calories"
			class="elevation-12"
		>
			<template v-slot:top>
				<v-toolbar
					flat
				>
					<v-toolbar-title>Category Management</v-toolbar-title>

					<v-divider class="mx-4" inset vertical />

					<v-spacer />

					<v-btn color="primary" dark class="mb-2 btn-register">
						<span class="mdi mdi-window-closed pr-1" />
						<span>New Category</span>
					</v-btn>

					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>

							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												:value="editedItem.name"
												label="Dessert name"
												disabled
											/>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												:value="editedItem.calories"
												label="Calories"
												disabled
											/>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												:value="editedItem.fat"
												label="Fat (g)"
												disabled
											/>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												:value="editedItem.carbs"
												label="Carbs (g)"
												disabled
											/>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												:value="editedItem.protein"
												label="Protein (g)"
												disabled
											/>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer />

								<v-btn tile color="success" @click="closeDelete">
									<v-icon left>mdi-delete-empty</v-icon>
									<span>Cancel</span>
								</v-btn>

								<v-btn tile color="success" @click="deleteItemConfirm">
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
				<v-icon small class="mr-2" @click="editItem(item)">
					mdi-pencil
				</v-icon>
				<v-icon small @click="deleteItem(item)">
					mdi-delete
				</v-icon>
			</template>

			<template v-slot:no-data>
				<span>Table is Empty</span>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import { getCategory } from '@/api/modules/category';

const URL_GET_CATEGORY = '/admin/category';

export default {
    name: 'CategoryManagement',
    data() {
        return {
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
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },

            created_date_menu: false,
            expired_date_menu: false,
        };
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
        },

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
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },

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
        this.initialize();
        this.getCategoryData();
    },

    methods: {
        async getCategoryData() {
            try {
                const response = await getCategory(URL_GET_CATEGORY);
                console.log(response);
            } catch (error) {
                console.log(error.message);
            }
        },

        initialize() {
            this.desserts = [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                },
            ];
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1);
            this.closeDelete();
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
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
            } else {
                this.desserts.push(this.editedItem);
            }
            this.close();
        },

        doFilter() {
            //
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

</style>
