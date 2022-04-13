<template>
	<div class="department-screen">
		<v-data-table
			:headers="vFields"
			name="department-table"
			:items="vItems"
			class="elevation-12 table-department-list"
			:search="search"
		>
			<template v-slot:top>
				<v-toolbar flat elevation="6">
					<v-row>
						<v-col cols="6" class="text-left">
							<v-toolbar-title>Department Management</v-toolbar-title>
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
						<v-dialog v-model="dialogNewDepartment" max-width="500px" persistent>
							<template v-slot:activator="{ on, attrs }">
								<v-btn color="primary" dark class="mb-2 open-register-modal-btn" v-bind="attrs" v-on="on">
									<v-icon left>mdi-plus-box</v-icon>
									<span>New Department</span>
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
													v-model="editedItem.departmentName"
													prepend-inner-icon="mdi-library"
													label="Department Name"
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
									<v-btn class="save-btn" color="blue darken-1" text @click="save()">
										<v-icon left>mdi-lead-pencil</v-icon>
										<span>{{ editedIndex === -1 ? "Register" : "Save" }}</span>
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-col>
				</v-row>

				<v-dialog v-model="dialogDeleteDepartment" max-width="500px">
					<v-card>
						<v-card-title>
							<v-row>
								<v-col cols="12" class="text-center">
									<span>Are you sure to delete this department?</span>
								</v-col>
							</v-row>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											:value="editedItem.departmentName"
											label="Department name"
											prepend-inner-icon="fa-building"
											readonly
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

			<template v-slot:[`item.actions`]="{ item }">
				<v-icon
					small
					class="mr-2"
					style="color: #051367"
					@click="editItem(item)"
				>mdi-pencil</v-icon>
				<v-icon
					small
					style="color: #e84545"
					@click="deleteItem(item)"
				>mdi-delete</v-icon>
			</template>

			<template v-slot:no-data>
				<span>Table is Empty</span>
			</template>
		</v-data-table>
	</div>
</template>

<script>
// Apis import
import {
    getDepartment,
    postDepartment,
    putDepartment,
    deleteDepartment,
} from '@/api/modules/department';

// URL apis
const urlAPI = {
    apiGetListDepartment: '/department',
    apiCreateNewDepartment: '/department',
    apiUpdateDepartment: '/department',
    apiDeleteDepartment: '/department',
};

// Helper functions import
import { isPassValidation } from './helper';
import { MakeToast } from '@/toast/toastMessage';

export default {
    name: 'DepartmentManagement',
    data() {
        return {
            dialogNewDepartment: false,
            dialogDeleteDepartment: false,

            vFields: [
                {
                    text: 'Department Name',
                    align: 'start',
                    sortable: false,
                    value: 'departmentName',
                },
                { text: 'Total Idea', value: 'numberOfIdea', align: 'center' },
                {
                    text: 'Total Staff',
                    value: 'numberOfContributor',
                    align: 'center',
                },
                { text: 'Actions', value: 'actions', sortable: false },
            ],

            vItems: [],

            editedIndex: -1,
            editedItem: {
                id: '',
                departmentName: '',
            },

            defaultItem: {
                id: '',
                departmentName: '',
            },

            search: '',
        };
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Department' : 'Edit Department';
        },
    },

    watch: {
        dialogNewDepartment(val) {
            val || this.close();
        },
        dialogDeleteDepartment(val) {
            val || this.closeDelete();
        },
    },

    created() {
        this.getDepartmentData();
    },

    methods: {
        async getDepartmentData() {
            try {
                const response = await getDepartment(urlAPI.apiGetListDepartment);
                if (response.status === true) {
                    this.$store.dispatch('chart/setTotalDepartment', response.departmentStatistic.length);
                    const RAW_DATA = [...response.departmentStatistic];
                    for (let i = 0; i < RAW_DATA.length; i++) {
                        this.vItems = RAW_DATA;
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        },

        async createNewDepartment() {
            if (isPassValidation(this.editedItem) === true) {
                this.close();
                try {
                    const response = await postDepartment(
                        urlAPI.apiCreateNewDepartment,
                        this.editedItem
                    );
                    if (response.status === true) {
                        MakeToast({
                            variant: 'success',
                            title: 'Success',
                            content: 'Create New Department Successful',
                        });

                        this.getDepartmentData();
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        },

        async updateDepartment(department_id) {
            if (isPassValidation(this.editedItem) === true) {
                this.close();
                const URL = `${urlAPI.apiUpdateDepartment}/${department_id}`;
                try {
                    const response = await putDepartment(
                        URL,
                        this.editedItem
                    );
                    if (response.status === true) {
                        MakeToast({
                            variant: 'success',
                            title: 'Success',
                            content: 'Update Department Successful',
                        });

                        this.getDepartmentData();
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        },

        async deleteDepartment(id) {
            this.closeDelete();
            const URL = `${urlAPI.apiDeleteDepartment}/${id}`;
            try {
                const response = await deleteDepartment(URL);
                if (response.status === true) {
                    MakeToast({
                        variant: 'success',
                        title: 'Success',
                        content: 'Delete Department Successful',
                    });

                    this.getDepartmentData();
                }
            } catch (error) {
                console.log(error.message);
            }
        },

        editItem(item) {
            this.editedIndex = this.vItems.indexOf(item);
            this.editedItem = {
                id: item._id,
                departmentName: item.departmentName,
            };
            this.dialogNewDepartment = true;
        },

        deleteItem(item) {
            this.editedIndex = this.vItems.indexOf(item);
            this.editedItem = {
                id: item._id,
                departmentName: item.departmentName,
            };
            this.dialogDeleteDepartment = true;
        },

        deleteItemConfirm() {
            this.deleteDepartment(this.editedItem.id);
        },

        close() {
            this.dialogNewDepartment = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDeleteDepartment = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                this.updateDepartment(this.editedItem.id);
            } else {
                this.createNewDepartment(this.editedItem);
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
