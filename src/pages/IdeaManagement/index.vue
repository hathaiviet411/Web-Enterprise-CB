<template>
	<div>
		<v-data-table
			:headers="vFields"
			:items="vItems"
			sort-by="calories"
			class="elevation-12"
		>
			<template v-slot:top>
				<v-toolbar
					flat
				>
					<v-toolbar-title>Idea Management</v-toolbar-title>

					<v-divider class="mx-4" inset vertical />

					<v-spacer />

					<v-dialog v-model="dialogCreateIdea" max-width="90%" persistent>
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click="delay()">
								<v-icon left>mdi-plus-box</v-icon>
								<span>New Idea</span>
							</v-btn>
						</template>

						<v-card :class="ckeditor">
							<v-card-title>
								<span class="text-h5">New Idea</span>
							</v-card-title>

							<v-card-text>
								<v-row>
									<v-col cols="12" sm="12" md="12">
										<v-file-input
											id="file_input"
											ref="file"
											v-model="editedItem.file"
											counter
											show-size
											truncate-length="15"
											chips
										/>
									</v-col>

									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.title"
											label="Title"
											prepend-icon="mdi-label"
											type="text"
											required
										/>
									</v-col>

									<v-col cols="12" sm="12" md="12">
										<v-select
											v-model="editedItem.category"
											:items="categoryOptions"
											label="Category"
											prepend-icon="mdi-library"
											required
										/>
									</v-col>

									<v-col cols="12" sm="12" md="12">
										<div class="mb-3">
											<v-icon left>mdi-keyboard</v-icon>
											<span style="font-size: 16px;">Idea Content</span>
										</div>
										<ckeditor
											v-model="editedItem.editorData"
											:editor="editor"
											:config="editorConfig"
											@focus="onEditorFocus()"
											@blur="onEditorBlur()"
										/>
									</v-col>

									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.author"
											label="Author"
											prepend-icon="mdi-book-open-page-variant"
											type="text"
											required
										/>
									</v-col>
								</v-row>
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
// Components import
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Apis import
import { getCategory } from '@/api/modules/category';
import { postIdea } from '@/api/modules/idea';

// Const APIs Url
const urlAPI = {
    getCategoryList: '/admin/category',
    postIdea: '/idea',
};

// Helper functions import
import { convertDateToISO } from '@/utils/handleConvertDateFormat';
import { MakeToast } from '@/toast/toastMessage';
import { isPassValidation } from './helper';

export default {
    name: 'IdeaManagement',
    data() {
        return {
            dialogCreateIdea: false,
            dialogDelete: false,

            vFields: [
                { text: 'Idea', align: 'start', sortable: false, value: 'idea_name' },
                { text: 'Category', value: 'category' },
                { text: 'Views (k)', value: 'view' },
                { text: 'Comments (k)', value: 'comment' },
                { text: 'Likes (k)', value: 'like' },
                { text: 'Dislikes (k)', value: 'dislike' },
                { text: 'Actions', value: 'actions' },
            ],

            vItems: [],

            editedIndex: -1,
            editedItem: {
                file: [],
                title: '',
                category: null,
                editorData: 'Enter your idea content here...',
                author: '',
            },

            defaultItem: {
                file: [],
                title: '',
                category: null,
                editorData: 'Enter your idea content here...',
                author: '',
            },

            editor: ClassicEditor,
            editorConfig: {},
            ckeditor: '',

            categoryOptions: [],
        };
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Idea' : 'Edit Idea';
        },
    },

    watch: {
        dialogCreateIdea(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    created() {
        this.getCategoryData();
    },

    methods: {
        async getCategoryData() {
            try {
                const response = await getCategory(urlAPI.getCategoryList);
                if (response.status === true) {
                    const RAW_DATA = [...response.category];
                    for (let i = 0; i < RAW_DATA.length; i++) {
                        RAW_DATA[i].firstClosureDate = convertDateToISO(RAW_DATA[i].firstClosureDate);
                        RAW_DATA[i].finalClosureDate = convertDateToISO(RAW_DATA[i].finalClosureDate);

                        this.categoryOptions.push(
                            { value: RAW_DATA[i]._id, text: RAW_DATA[i].categoryName }
                        );
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        },

        onEditorFocus() {
            if (this.editedItem.editorData === 'Enter your idea content here...') {
                this.editedItem.editorData = '';
            }
        },

        async createNewIdea() {
            const formData = new FormData();
            this.editedItem.file = document.getElementById('file_input').files[0];
            const fileSize = this.editedItem.file.size;
            const fileName = this.editedItem.file.name;

            console.log(fileSize);
            console.log(fileName);

            if (fileSize > 50000000) {
                MakeToast({
                    variant: 'warning',
                    title: 'Warning',
                    content: 'File size must be less than 50MB',
                });
            } else {
                if (this.editedItem.file && isPassValidation(this.editedItem) === true) {
                    formData.append('ideaFile', this.editedItem.file);
                    formData.append('ideaTitle', this.editedItem.title);
                    formData.append('ideaContent', this.editedItem.editorData);
                    formData.append('isAnonymous', false);
                    formData.append('category', this.editedItem.category);
                    formData.append('author', this.editedItem.author);

                    try {
                        const response = await postIdea(urlAPI.postIdea, formData);
                        if (response.status === true) {
                            MakeToast({
                                variant: 'success',
                                title: 'Success',
                                content: 'Idea created successfully',
                            });
                            this.dialogCreateIdea = false;
                            this.getCategoryData();
                        }
                    } catch (error) {
                        console.log(error.message);
                    }
                }
            }
        },

        uploadFile() {
            this.editedItem.file = this.$refs.file;
        },

        onEditorBlur() {
            if (this.editedItem.editorData === '') {
                this.editedItem.editorData = 'Enter your idea content here...';
            }
        },

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        async delay() {
            this.ckeditor = 'ckeditor_before';
            await this.sleep(200);
            this.ckeditor = 'ckeditor_after';
        },

        editItem(item) {
            this.editedIndex = this.vItems.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogCreateIdea = true;
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
            this.dialogCreateIdea = false;
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
                Object.assign(this.vItems[this.editedIndex], this.editedItem);
            } else {
                this.createNewIdea();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .btn-register {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    }

    .ckeditor_before {
        width: 90%;
    }

    .ckeditor_after {
        width: 100%;
    }
</style>
