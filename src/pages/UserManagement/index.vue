<template>
	<div class="user-screen">
		<v-data-table
			:headers="vFields"
			:items="vItems"
			class="elevation-12 table-user-list"
			:search="search"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>User Management</v-toolbar-title>

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

					<v-dialog v-model="dialog" max-width="500px" persistent>
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="primary" dark class="mb-2 open-register-modal-btn" v-bind="attrs" v-on="on">
								<v-icon left>mdi-plus-box</v-icon>
								<span>New User</span>
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
												v-model="editedItem.username"
												prepend-icon="mdi-account"
												label="Username"
												required
												type="text"
											/>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.name"
												prepend-icon="mdi-border-color"
												label="Full name"
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
											<v-select
												v-model="editedItem.roleId"
												:items="roleOptions"
												label="Role"
												prepend-icon="mdi-account-key"
												dense
												required
											/>
										</v-col>
										<v-col cols="12" sm="12" md="12">
											<v-select
												v-model="editedItem.departmentId"
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
										<v-col cols="12">
											<b-form-checkbox
												v-model="editedItem.isAgreedTerm"
												size="lg"
											>
												<span
													style="font-size: 16px !important"
												>I agreed with Idea Collecting System's Terms and
													Services agreement.</span>
											</b-form-checkbox>
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
				</v-toolbar>
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<v-icon
					small
					class="mr-2"
					style="color: #051367"
					@click="editItem(item)"
				>mdi-pencil</v-icon>
			</template>

			<template v-slot:[`item.user.isAgreedTerm`]="{ isAgreedTerm }">
				<span
					v-if="isAgreedTerm === true"
					style="color: #3dc238; font-weight: bold"
				>{{ "Agreed" }}</span>
				<span v-else style="color: #d11515; font-weight: bold">{{
					"Disagreed"
				}}</span>
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
import { getUser, postUser, putUser } from '@/api/modules/user';

// Helper functions import
import { isPassValidation } from './helper';
import { MakeToast } from '@/toast/toastMessage';

const urlAPI = {
    apiGetListRole: '/role',
    apiGetListDepartment: '/department',
    apiGetListUser: '/user',
    apiCreateUser: '/register',
    apiUpdateUser: '/user',
};

export default {
    name: 'UserManagement',
    data() {
        return {
            dialog: false,
            dialogDelete: false,

            vFields: [
                {
                    text: 'Username',
                    align: 'start',
                    sortable: false,
                    value: 'user.username',
                },
                {
                    text: 'Full name',
                    align: 'start',
                    sortable: false,
                    value: 'user.name',
                },
                { text: 'User Email', value: 'user.email', align: 'center' },
                { text: 'User Role', value: 'role.roleName', align: 'center' },
                {
                    text: 'Department',
                    value: 'department.departmentName',
                    align: 'center',
                },
                {
                    text: 'Agreed with Term',
                    value: 'user.isAgreedTerm',
                    align: 'center',
                },
                { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
            ],

            vItems: [],

            editedIndex: -1,
            editedItem: {
                id: '',
                username: '',
                name: '',
                email: '',
                password: '',
                isAgreedTerm: false,
                roleId: null,
                departmentId: null,
            },

            defaultItem: {
                id: '',
                username: '',
                name: '',
                email: '',
                password: '',
                isAgreedTerm: false,
                roleId: null,
                departmentId: null,
            },

            roleOptions: [],
            departmentOptions: [],

            search: '',
        };
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New User' : 'Edit User';
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
    },

    methods: {
        async initData() {
            await this.getListRole();
            await this.getListDepartment();
            await this.getListUsers();
        },

        async getListUsers() {
            try {
                const response = await getUser(urlAPI.apiGetListUser);
                if (response.status === true) {
                    this.vItems = response.user;
                }
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
                        this.roleOptions.push({
                            value: DATA[i]._id,
                            text: DATA[i].roleName,
                        });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        async getListDepartment() {
            try {
                const response = await getDepartment(urlAPI.apiGetListDepartment);

                if (response.status === true) {
                    const DATA = response.departmentStatistic;
                    for (let i = 0; i < DATA.length; i++) {
                        this.departmentOptions.push({
                            value: DATA[i]._id,
                            text: DATA[i].departmentName,
                        });
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
                    const response = await postUser(
                        urlAPI.apiCreateUser,
                        this.editedItem
                    );
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

        async updateUser(ID) {
            const URL = `${urlAPI.apiUpdateUser}/${ID}`;
            if (isPassValidation(this.editedItem) === true) {
                this.close();
                try {
                    const response = await putUser(URL, this.editedItem);
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }
        },

        editItem(item) {
            this.editedIndex = this.vItems.indexOf(item);
            this.editedItem = {
                id: item.user._id,
                username: item.user.username,
                email: item.user.email,
                name: item.user.name,
                password: '',
                isAgreedTerm: item.user.isAgreedTerm,
                roleId: item.role._id,
                departmentId: item.department._id,
            };
            this.dialog = true;
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                this.updateUser(this.editedItem.id);
            } else {
                this.createUser();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.btn-register {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}
</style>
