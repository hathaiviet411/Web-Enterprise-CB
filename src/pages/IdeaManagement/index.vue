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

					<v-dialog v-model="dialogCreateIdea" max-width="80%" persistent>
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click="delay()">
								<v-icon left>mdi-plus-box</v-icon>
								<span>New Idea</span>
							</v-btn>
						</template>

						<v-card height="500" :class="ckeditor">
							<v-card-title>
								<span class="text-h5">New Idea</span>
							</v-card-title>

							<v-card-text>
								<ckeditor v-model="editorData" :editor="editor" :config="editorConfig" />
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

            editor: ClassicEditor,
            editorData: '<p>Enter your idea content here...</p>',
            editorConfig: {},
            ckeditor: '',
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
        this.initialize();
    },

    methods: {
        initialize() {
            this.vItems = [
                {
                    idea_name: 'Frozen Yogurt',
                    category: 159,
                    view: 6,
                    comment: 24,
                    like: 4,
                    dislike: 2,
                },
                {
                    idea_name: 'Ice cream sandwich',
                    category: 237,
                    view: 9,
                    comment: 37,
                    like: 4.3,
                    dislike: 9,
                },
                {
                    idea_name: 'Eclair',
                    category: 262,
                    view: 16,
                    comment: 23,
                    like: 6,
                    dislike: 2,
                },
                {
                    idea_name: 'Cupcake',
                    category: 305,
                    view: 3.7,
                    comment: 67,
                    like: 4.3,
                    dislike: 8,
                },
                {
                    idea_name: 'Gingerbread',
                    category: 356,
                    view: 16,
                    comment: 49,
                    like: 3.9,
                    dislike: 16,
                },
                {
                    idea_name: 'Jelly bean',
                    category: 375,
                    view: 2,
                    comment: 94,
                    like: 9,
                    dislike: 1,
                },
                {
                    idea_name: 'Lollipop',
                    category: 392,
                    view: 0.2,
                    comment: 98,
                    like: 2,
                    dislike: 2,
                },
                {
                    idea_name: 'Honeycomb',
                    category: 408,
                    view: 3.2,
                    comment: 87,
                    like: 6.5,
                    dislike: 21,
                },
                {
                    idea_name: 'Donut',
                    category: 452,
                    view: 25,
                    comment: 51,
                    like: 4.9,
                    dislike: 22,
                },
                {
                    idea_name: 'KitKat',
                    category: 518,
                    view: 26,
                    comment: 65,
                    like: 7,
                    dislike: 6,
                },
            ];
        },

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        async delay() {
            this.ckeditor = 'ckeditor_before';
            await this.sleep(100);
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
                this.vItems.push(this.editedItem);
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
        width: 99%;
    }

    .ckeditor_after {
        width: 100%;
    }
</style>
