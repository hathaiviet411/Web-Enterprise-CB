	<v-dialog
						v-model="dialog"
						max-width="500px"
					>
						<template v-slot:activator="{ on, attrs }" />
						<v-card>
							<v-card-title>
								<span class="text-h5">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-row>
										<v-col
											cols="12"
											sm="6"
											md="4"
										>
											<v-text-field
												v-model="editedItem.name"
												label="Dessert name"
											/>
										</v-col>
										<v-col
											cols="12"
											sm="6"
											md="4"
										>
											<v-text-field
												v-model="editedItem.calories"
												label="Calories"
											/>
										</v-col>
										<v-col
											cols="12"
											sm="6"
											md="4"
										>
											<v-text-field
												v-model="editedItem.fat"
												label="Fat (g)"
											/>
										</v-col>
										<v-col
											cols="12"
											sm="6"
											md="4"
										>
											<v-text-field
												v-model="editedItem.carbs"
												label="Carbs (g)"
											/>
										</v-col>
										<v-col
											cols="12"
											sm="6"
											md="4"
										>
											<v-text-field
												v-model="editedItem.protein"
												label="Protein (g)"
											/>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer />
								<v-btn
									color="blue darken-1"
									text
									@click="close"
								>
									Cancel
								</v-btn>
								<v-btn
									color="blue darken-1"
									text
									@click="save"
								>
									Save
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>