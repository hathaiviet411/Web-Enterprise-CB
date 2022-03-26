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

					<v-dialog v-model="dialogNewUser" max-width="800px" persistent>
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
												prepend-icon="mdi-account"
												label="Username"
												required
												type="text"
											/>
										</v-col>

										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.email"
												prepend-icon="mdi-email"
												label="Email"
												required
												type="email"
											/>
										</v-col>

										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.name"
												prepend-icon="mdi-border-color"
												label="Name"
												required
												type="text"
											/>
										</v-col>

										<v-col cols="12" sm="12" md="12">
											<v-select
												v-model="editedItem.role"
												:items="roleOptions"
												label="Role"
												prepend-icon="mdi-account-key"
												dense
												required
											/>
										</v-col>

										<v-col cols="12" sm="12" md="12">
											<v-select
												v-model="editedItem.department"
												:items="departmentOptions"
												label="Department"
												prepend-icon="mdi-domain"
												dense
											/>
										</v-col>

										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.password"
												prepend-icon="mdi-lock"
												label="Password"
												required
												type="password"
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

								<v-btn color="blue darken-1" text @click="save()">
									<v-icon left>mdi-lead-pencil</v-icon>
									<span>{{ editedIndex === -1 ? 'Register' : 'Save' }}</span>
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
// Apis import
import { getRole } from '@/api/modules/role';
import { getDepartment } from '@/api/modules/department';
import { getUser, postUser } from '@/api/modules/user';

// Helper functions import
import { isPassValidation } from './helper';
import { MakeToast } from '@/toast/toastMessage';

const urlAPI = {
    apiGetListRole: '/role',
    apiGetListDepartment: '/department',
    apiGetListUser: '/user',
    apiPostUser: '/register',
};

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
                username: '',
                email: '',
                name: '',
                password: '',
                role: null,
                department: null,
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
        this.getListRole();
        this.getListDepartment();
        this.getListUsers();
    },

    methods: {
        async getListUsers() {
            try {
                const response = await getUser(urlAPI.apiGetListUser);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },

        async getListRole() {
            try {
                const response = await getRole(urlAPI.apiGetListRole);

                if (response.status === true) {
                    const DATA = response.role;
                    for (let i = 0; i < DATA.length; i++) {
                        this.roleOptions.push(
                            { value: DATA[i]._id, text: DATA[i].roleName }
                        );
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        validateEmail() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.editedItem.email)) {
                console.log('Please enter a valid email address');
            } else {
                console.log('Good job bitch!');
            }
        },

        async getListDepartment() {
            try {
                const response = await getDepartment(urlAPI.apiGetListDepartment);

                if (response.status === true) {
                    const DATA = response.departmentStatistic;
                    for (let i = 0; i < DATA.length; i++) {
                        this.departmentOptions.push(
                            { value: DATA[i]._id, text: DATA[i].departmentName }
                        );
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        async createUser() {
            if (isPassValidation(this.editedItem) === true) {
                this.close();

                try {
                    const response = await postUser(urlAPI.apiPostUser, this.editedItem);
                    if (response.status === true) {
                        MakeToast({
                            variant: 'success',
                            title: 'Success',
                            content: 'Create User Successful',
                        });

                        this.getListUsers();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },

        async updateUser() {
            if (isPassValidation(this.editedItem) === true) {
                //
            }
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

        save() {
            if (this.editedIndex > -1) {
                this.updateUser(this.editedItem);
            } else {
                this.createUser();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .btn-register {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    }
</style>
