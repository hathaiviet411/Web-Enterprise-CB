<template>
	<div>
		<v-data-table
			:headers="vFields"
			:items="vItems"
			sort-by="role"
			class="elevation-12"
		>
			<template v-slot:top>
				<v-toolbar
					flat
				>
					<v-toolbar-title>User Management</v-toolbar-title>

					<v-divider class="mx-4" inset vertical />

					<v-spacer />

					<v-dialog v-model="dialogNewUser" max-width="800px">
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
								<v-icon left>mdi-plus-box</v-icon>
								<span>New User</span>
							</v-btn>
						</template>

						<v-card>
							<v-card-title>
								<span class="text-h5">{{ 'New User' }}</span>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.username"
												prepend-inner-icon="mdi-account"
												label="Username"
											/>
										</v-col>

										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.user_email"
												prepend-inner-icon="mdi-email"
												label="Email"
											/>
										</v-col>

										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.name"
												prepend-inner-icon="mdi-border-color"
												label="Name"
											/>
										</v-col>

										<v-col cols="12" sm="12" md="12">
											<v-select
												v-model="editedItem.role"
												:items="roleOptions"
												label="Role"
												prepend-inner-icon="mdi-account-key"
												dense
											/>
										</v-col>

										<v-col cols="12" sm="12" md="12">
											<v-select
												v-model="editedItem.department"
												:items="departmentOptions"
												label="Department"
												prepend-inner-icon="mdi-domain"
												dense
											/>
										</v-col>

										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.password"
												prepend-inner-icon="mdi-lock"
												label="Password"
											/>
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

								<v-btn color="blue darken-1" text @click="create()">
									<v-icon left>mdi-lead-pencil</v-icon>
									<span>{{ 'Register' }}</span>
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>

					<!-- <v-btn color="primary" dark class="mb-2 btn-register">
						<span class="mdi mdi-account-plus pr-1" />
						<span>New User</span>
					</v-btn> -->

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
												:value="editedItem.role"
												label="role"
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
    name: 'UserManagement',
    data() {
        return {
            dialogNewUser: false,
            dialogDelete: false,
            vFields: [
                { text: 'User Name', align: 'start', sortable: false, value: 'name' },
                { text: 'User Role', value: 'role' },
                { text: 'Department', value: 'department' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            vItems: [],
            editedIndex: -1,
            editedItem: {
                username: '',
                email: '',
                name: '',
                password: '',
                role: null,
                department: null,
            },
            defaultItem: {
                name: '',
                role: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            roleOptions: [],
            departmentOptions: [],
        };
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
        },
    },

    watch: {
        dialogNewUser(val) {
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
            this.vItems = [
                {
                    name: 'Frozen Yogurt',
                    role: 'Admin',
                    department: 'Hochiminh City',
                },
                {
                    name: 'Ice cream sandwich',
                    role: 'Staff',
                    department: 'Hanoi',
                },
                {
                    name: 'Eclair',
                    role: 'Quality Assurance Manager ',
                    department: 'Hochiminh City',
                },
                {
                    name: 'Cupcake',
                    role: 'Quality Assurance Coordinator',
                    department: 'Hanoi',
                },
            ];
        },

        editItem(item) {
            this.editedIndex = this.vItems.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogNewUser = true;
        },

        deleteItem(item) {
            this.editedIndex = this.vItems.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.vItems.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialogNewUser = false;
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

        create() {
            if (this.editedIndex > -1) {
                Object.assign(this.vItems[this.editedIndex], this.editedItem);
            } else {
                this.vItems.push(this.editedItem);
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
