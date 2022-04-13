<template>
	<div class="idea-screen">
		<v-data-table
			:headers="vFields"
			:items="vItems"
			class="elevation-12 table-idea-list"
			:search="search"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Idea Management</v-toolbar-title>

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

					<v-dialog v-model="dialogCreateIdea" max-width="500px" persistent>
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="primary" dark class="mb-2 open-register-modal-btn" v-bind="attrs" v-on="on">
								<v-icon left>mdi-plus-box</v-icon>
								<span>New Idea</span>
							</v-btn>
						</template>

						<v-card>
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
											accept=".docx, .txt, .pdf, .zip, .rar, .csv, .xlsx"
											multiple
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
										<v-textarea
											v-model="editedItem.editorData"
											label="Idea Content"
											hide-details
											prepend-icon="mdi-book-open-page-variant"
											required
											rows="1"
											auto-grow
										/>
									</v-col>

									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.author"
											label="Author"
											prepend-icon="mdi-feather"
											type="text"
											required
										/>
									</v-col>

									<v-col cols="12">
										<b-form-checkbox v-model="editedItem.isAnonymous" size="lg">
											<span
												style="font-size: 16px !important"
											>Post Idea in Anonymous Mode.</span>
										</b-form-checkbox>
									</v-col>
								</v-row>
							</v-card-text>

							<v-card-actions>
								<v-spacer />

								<v-btn color="red darken-1" text @click="close()">
									<v-icon left>mdi-exit-to-app</v-icon>
									<span>Cancel</span>
								</v-btn>

								<v-btn
									v-if="isAgreedTerm === false"
									color="blue darken-1"
									class="save-btn"
									text
									@click.stop="dialogTermService = true"
								>
									<v-icon>mdi-lead-pencil</v-icon>
									<span>{{ editedIndex === -1 ? "Register" : "Save" }}</span>
								</v-btn>

								<v-btn v-else color="blue darken-1" text @click="save()">
									<v-icon>mdi-lead-pencil</v-icon>
									<span>{{ editedIndex === -1 ? "Register" : "Save" }}</span>
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>

					<!-- Term and Services Dialog -->
					<v-dialog
						id="v-dialog-term-services"
						v-model="dialogTermService"
						width="600px"
					>
						<v-card>
							<v-card-title>
								<span
									lass="text-h5"
								>Idea Collecting System's Terms and Services</span>
								<v-icon left>mdi-atom</v-icon>
							</v-card-title>

							<v-card-text>
								<div class="content">
									<v-row>
										<v-col cols="12">
											<p class="text-justify">
												This Software Development Agreement (the “Agreement” or
												“Software Development Agreement”) states the terms and
												conditions that govern the contractual agreement between
												having his principal place of business at 200 Clock
												Tower Pl Carmel, California(CA), 93923, (the
												“Developer”), and having its principal place of business
												at 200 Gainsborough Cir Folsom, California(CA), 95630
												(the “Client”) who agrees to be bound by this Agreement.
												WHEREAS, the Client has conceptualized [QUICK
												DESCRIPTION OF SOFTWARE] (the “Software”), which is
												described in further detail on Exhibit A, and the
												Developer is a contractor with whom the Client has come
												to an agreement to develop the Software. NOW, THEREFORE,
												In consideration of the mutual covenants and promises
												made by the parties to this Software Development
												Agreement, the Developer and the Client (individually,
												each a “Party” and collectively, the “Parties”) covenant
												and agree as follows:
											</p>
										</v-col>

										<v-col cols="12">
											<h5>1. Developer's duties</h5>
										</v-col>

										<v-col cols="12">
											<p>
												The Client hereby engages the Developer and the
												Developer hereby agrees to be engaged by the Client to
												develop the Software in accordance with the
												specifications attached hereto as Exhibit A (the
												“Specifications”).
											</p>

											<ol>
												<li>
													<p>
														The Developer shall complete the development of the
														Software according to the milestones described on
														the form attached hereto as Exhibit B. In accordance
														with such milestones, the final product shall be
														delivered to the Client by May 12 (the “Delivery
														Date”)..
													</p>
												</li>

												<li>
													<p>
														For a period of 20 days after delivery of the final
														product, the Developer shall provide the Client
														attention to answer any questions or assist solving
														any problems with regard to the operation of the
														Software up to 90 of hours free of charge and billed
														to the Client at a rate of $40 per hour for any
														assistance thereafter. The Developer agrees to
														respond to any reasonable request for assistance
														made by the Client regarding the Software within 30
														days of the request.
													</p>
												</li>

												<li>
													<p>
														Except as expressly provided in this Software
														Development Agreement, the Client shall not be
														obligated under this Agreement to provide any other
														support or assistance to the Developer.
													</p>
												</li>

												<li>
													<p>
														The Client may terminate this Software Development
														Agreement at any time upon material breach of the
														terms herein and failure to cure such a breach
														within 20 days of notification of such a breach.
													</p>
												</li>

												<li>
													<p>
														The Developer shall provide to the Client after the
														Delivery Date, a cumulative 2 days of training with
														respect to the operation of the Soft
													</p>
												</li>
											</ol>
										</v-col>

										<v-col cols="12">
											<h5>2. Delivery</h5>
										</v-col>

										<v-col cols="12">
											<p>
												The Software shall function in accordance with the
												Specifications on or before the Delivery Date.
											</p>

											<ol>
												<li>
													<p>
														If the Software as delivered does not conform with
														the Specifications, the Client shall within 30 days
														of the Delivery Date notify the Developer in writing
														of the ways in which it does not conform with the
														Specifications. The Developer agrees that upon
														receiving such notice, it shall make reasonable
														efforts to correct any non-conformity.
													</p>
												</li>

												<li>
													<p>
														The Client shall provide to the Developer written
														notice of its finding that the Software conforms to
														the Specifications within 20 days of the Delivery
														Date (the “Acceptance Date”) unless it finds that
														the Software does not conform to the Specifications
														as described in Section 2(A) herein.
													</p>
												</li>
											</ol>
										</v-col>

										<v-col cols="12">
											<h5>3. Compensation</h5>
										</v-col>

										<v-col cols="12">
											<p>
												Compensation. In consideration for the Service, the
												Client shall pay the Company at the rate of $20 per hour
												(the “Hourly Rate”), with a maximum total fee for all
												work under this Software Development Agreement of
												$50.000. Fees billed under the Hourly Rate shall be due
												and payable upon the Developer providing the Client with
												an invoice. Invoices will be provided for work completed
												by the developer once every 30 days.
											</p>
										</v-col>

										<v-col cols="12">
											<h5>4. Intellectual property rights in the software</h5>
										</v-col>

										<v-col cols="12">
											<p>
												The Parties acknowledge and agree that the Client will
												hold all intellectual property rights in the Software
												including, but not limited to, copyright and trademark
												rights. The Developer agrees not to claim any such
												ownership in the Software’s intellectual property at any
												time prior to or after the completion and delivery of
												the Software to the Client.
											</p>
										</v-col>

										<v-col cols="12">
											<h5>5. Change in specifications</h5>
										</v-col>

										<v-col cols="12">
											<p>
												The Client may request that reasonable changes be made
												to the Specifications and tasks associated with the
												implementation of the Specifications. If the Client
												requests such a change, the Developer will use its best
												efforts to implement the requested change at no
												additional expense to the Client and without delaying
												delivery of the Software. In the event that the proposed
												change will, in the sole discretion of the Developer,
												require a delay in the delivery of the Software or would
												result in additional expense to the Client, then the
												Client and the Developer shall confer and the Client may
												either withdraw the proposed change or require the
												Developer to deliver the Software with the proposed
												change and subject to the delay and/or additional
												expense. The Client agrees and acknowledges that the
												judgment as to if there will be any delay or additional
												expense shall be made solely by the Developer.
											</p>
										</v-col>

										<v-col cols="12">
											<h5>6. Confidentiality</h5>
										</v-col>

										<v-col cols="12">
											<p>
												The Developer shall not disclose to any third party the
												business of the Client, details regarding the Software,
												including, without limitation any information regarding
												the Software's code, the Specifications, or the Client's
												business (the “Confidential Information”), (ii) make
												copies of any Confidential Information or any content
												based on the concepts contained within the Confidential
												Information for personal use or for distribution unless
												requested to do so by the Client, or (iii) use
												Confidential Information other than solely for the
												benefit of the Client.
											</p>
										</v-col>

										<v-col cols="12">
											<h5>7. Developer warranties</h5>
										</v-col>

										<v-col cols="12">
											<p>
												The Developer represents and warrants to the Client the
												following:
											</p>

											<ol>
												<li>
													<p>
														violation of any other agreement that the Developer
														has with another party.
													</p>
												</li>

												<li>
													<p>
														The Software will not violate the intellectual
														property rights of any other party.
													</p>
												</li>

												<li>
													<p>
														For a period of 10 days after the Delivery Date, the
														Software shall operate according to the
														Specifications. If the Software malfunctions or in
														any way does not operate according to the
														Specifications within that time, then the Developer
														shall take any reasonably necessary steps to fix the
														issue and ensure the Software operates according to
														the Specifications.
													</p>
												</li>
											</ol>
										</v-col>

										<v-col cols="12">
											<h5>8. Indemnification</h5>
										</v-col>

										<v-col cols="12">
											<p>
												The Developer agrees to indemnify, defend, and protect
												the Client from and against all lawsuits and costs of
												every kind pertaining to the software including
												reasonable legal fees due to the Developer’s
												infringement of the intellectual rights of any third
												party.
											</p>
										</v-col>

										<v-col cols="12">
											<h5>9. No modification unless in writing</h5>
										</v-col>

										<v-col cols="12">
											<p>
												No modification of this Agreement shall be valid unless
												in writing and agreed upon by both Parties.
											</p>
										</v-col>

										<v-col cols="12">
											<h5>10. Applicable law</h5>
										</v-col>

										<v-col cols="12">
											<p>
												This Software Development Agreement and the
												interpretation of its terms shall be governed by and
												construed in accordance with the laws of the State of
												California and subject to the exclusive jurisdiction of
												the federal and state courts located in Alpine,
												California.
											</p>
										</v-col>
									</v-row>
								</div>
							</v-card-text>
							<v-card-actions>
								<v-spacer />
								<v-btn
									color="red darken-1"
									text
									@click="dialogTermService = false"
								>
									Disagree
								</v-btn>
								<v-btn color="green darken-1" text @click="save()">
									Agree
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>

					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title
								class="text-h5"
							>Are you sure you want to delete this idea?</v-card-title>

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
				</v-toolbar>
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<v-icon
					disabled
					small
					class="mr-2"
					style="color: #051367"
					@click="editItem(item)"
				>mdi-pencil</v-icon>
				<v-icon
					disabled
					small
					style="color: #e84545"
					@click="deleteItem(item)"
				>mdi-delete</v-icon>
			</template>

			<template v-slot:[`item.category`]="{ category }">
				<span>{{ toCategoryName(category) }}</span>
			</template>

			<template v-slot:[`item.department`]="{ department }">
				<span>{{ toDepartmentName(department) }}</span>
			</template>

			<template v-slot:[`item.user`]="{ user }">
				<span>{{ toUserName(user) }}</span>
			</template>

			<template v-slot:[`item.createdAt`]="{ item }">
				<span>{{ item.createdAt | moment("dddd, MM/YYYY, HH:mm A") }}</span>
			</template>

			<template v-slot:no-data>
				<span>Table is Empty</span>
			</template>
		</v-data-table>
	</div>
</template>

<script>
// Apis import
import { getCategory } from '@/api/modules/category';
import { getAllIdea, postIdea } from '@/api/modules/idea';
import { getDepartment } from '@/api/modules/department';
import { getUser } from '@/api/modules/user';

// Const APIs Url
const urlAPI = {
    getCategoryList: '/category',
    postIdea: '/idea',
    getAllIdea: '/idea',
    apiGetListUser: '/user',
    apiGetListDepartment: '/department',
};

// Helper functions import
import { convertDateToISO } from '@/utils/handleConvertDateFormat';
import { MakeToast } from '@/toast/toastMessage';
import { isPassValidation } from './helper';

export default {
    name: 'IdeaManagement',
    data() {
        return {
            convertDateToISO: convertDateToISO,
            dialogCreateIdea: false,
            dialogTermService: false,
            dialogDelete: false,

            vFields: [
                { text: 'Idea', align: 'start', sortable: false, value: 'ideaTitle' },
                { text: 'Category', value: 'category' },
                { text: 'Department', value: 'department' },
                { text: 'Author', value: 'user' },
                { text: 'Posted Date', value: 'createdAt' },
                { text: 'Actions', value: 'actions' },
            ],

            vItems: [],

            isAgreedTerm: this.$store.getters.profile.isAgreedTerm,

            editedIndex: -1,
            editedItem: {
                file: [],
                title: '',
                category: null,
                content: '',
                author: '',
                isAnonymous: false,
            },

            defaultItem: {
                file: [],
                title: '',
                category: null,
                content: '',
                author: '',
                isAnonymous: false,
            },

            categoryOptions: [],

            categoryList: [],
            departmentList: [],
            userList: [],

            search: '',
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
        this.initData();
    },

    methods: {
        async initData() {
            await this.getListIdea();
            await this.getListUsers();
            await this.getListDepartment();
            await this.getListCategory();
        },

        async getListIdea() {
            try {
                const response = await getAllIdea(urlAPI.getAllIdea);
                if (response.status === true) {
                    this.vItems = response.data.idea;
                }
            } catch (error) {
                console.log(error.message);
            }
        },

        async getListUsers() {
            try {
                const response = await getUser(urlAPI.apiGetListUser);
                if (response.status === true) {
                    this.userList = response.user;
                }
            } catch (error) {
                console.log(error);
            }
        },

        toUserName(user_id) {
            for (let i = 0; i < this.userList.length; i++) {
                if (this.userList[i].id === user_id) {
                    return this.userList[i].user.name;
                }
            }
        },

        async getListDepartment() {
            try {
                const response = await getDepartment(urlAPI.apiGetListDepartment);
                if (response.status === true) {
                    const RAW_DATA = [...response.departmentStatistic];
                    for (let i = 0; i < RAW_DATA.length; i++) {
                        this.departmentList = RAW_DATA;
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        },

        toDepartmentName(department_id) {
            for (let i = 0; i < this.departmentList.length; i++) {
                if (this.departmentList[i].id === department_id) {
                    return this.departmentList[i].departmentName;
                }
            }
        },

        async getListCategory() {
            try {
                const response = await getCategory(urlAPI.getCategoryList);
                if (response.status === true) {
                    const RAW_DATA = [...response.category];
                    for (let i = 0; i < RAW_DATA.length; i++) {
                        RAW_DATA[i].firstClosureDate = convertDateToISO(
                            RAW_DATA[i].firstClosureDate
                        );
                        RAW_DATA[i].finalClosureDate = convertDateToISO(
                            RAW_DATA[i].finalClosureDate
                        );

                        this.categoryOptions.push({
                            value: RAW_DATA[i]._id,
                            text: RAW_DATA[i].categoryName,
                        });
                    }

                    this.categoryList = RAW_DATA;
                }
            } catch (error) {
                console.log(error.message);
            }
        },

        toCategoryName(category_id) {
            for (let i = 0; i < this.categoryList.length; i++) {
                if (this.categoryList[i].id === category_id) {
                    return this.categoryList[i].categoryName;
                }
            }
        },

        async createNewIdea() {
            const formData = new FormData();

            if (isPassValidation(this.editedItem) === true) {
                formData.append('ideaFile', this.editedItem.file);
                formData.append('ideaTitle', this.editedItem.title);
                formData.append('ideaContent', this.editedItem.content);
                formData.append('isAnonymous', this.editedItem.isAnonymous);
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
                        this.getListIdea();
                    } else if (response.status === false) {
                        MakeToast({
                            variant: 'warning',
                            title: 'Warning',
                            content: `${response.message}`,
                        });
                        this.dialogCreateIdea = false;
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        },

        uploadFile() {
            this.editedItem.file = this.$refs.file;
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
                this.editedItem.isAgreedTerm = true;
                this.dialogTermService = false;
                this.createNewIdea();
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

.ckeditor_before {
  width: 90%;
}

.ckeditor_after {
  width: 100%;
}
</style>
