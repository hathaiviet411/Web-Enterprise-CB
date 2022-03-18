<template>
	<div>
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
					<v-toolbar-title>Ideal Management</v-toolbar-title>

					<v-divider class="mx-4" inset vertical />

					<v-spacer />

					<v-btn color="primary" dark class="mb-2 btn-register">
						<span class="mdi mdi-account-plus pr-1" />
						<span>New Ideal</span>
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
export default {
    name: 'IdealManagement',
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: 'Ideal', align: 'start', sortable: false, value: 'ideal_name' },
                { text: 'Category', value: 'category' },
                { text: 'Views (k)', value: 'view' },
                { text: 'Comments (k)', value: 'comment' },
                { text: 'Likes (k)', value: 'like' },
                { text: 'Dislikes (k)', value: 'dislike' },
                { text: 'Actions', value: 'actions' },
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
        };
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            this.desserts = [
                {
                    ideal_name: 'Frozen Yogurt',
                    category: 159,
                    view: 6,
                    comment: 24,
                    like: 4,
                    dislike: 2,
                },
                {
                    ideal_name: 'Ice cream sandwich',
                    category: 237,
                    view: 9,
                    comment: 37,
                    like: 4.3,
                    dislike: 9,
                },
                {
                    ideal_name: 'Eclair',
                    category: 262,
                    view: 16,
                    comment: 23,
                    like: 6,
                    dislike: 2,
                },
                {
                    ideal_name: 'Cupcake',
                    category: 305,
                    view: 3.7,
                    comment: 67,
                    like: 4.3,
                    dislike: 8,
                },
                {
                    ideal_name: 'Gingerbread',
                    category: 356,
                    view: 16,
                    comment: 49,
                    like: 3.9,
                    dislike: 16,
                },
                {
                    ideal_name: 'Jelly bean',
                    category: 375,
                    view: 2,
                    comment: 94,
                    like: 9,
                    dislike: 1,
                },
                {
                    ideal_name: 'Lollipop',
                    category: 392,
                    view: 0.2,
                    comment: 98,
                    like: 2,
                    dislike: 2,
                },
                {
                    ideal_name: 'Honeycomb',
                    category: 408,
                    view: 3.2,
                    comment: 87,
                    like: 6.5,
                    dislike: 21,
                },
                {
                    ideal_name: 'Donut',
                    category: 452,
                    view: 25,
                    comment: 51,
                    like: 4.9,
                    dislike: 22,
                },
                {
                    ideal_name: 'KitKat',
                    category: 518,
                    view: 26,
                    comment: 65,
                    like: 7,
                    dislike: 6,
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
    },
};
</script>

<style lang="scss" scoped>
    .btn-register {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    }
</style>
