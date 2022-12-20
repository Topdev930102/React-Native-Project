export default contract_abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "company",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "createProductJson",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "deleteProductJson",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "input",
				"type": "string"
			}
		],
		"name": "pushFormula",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "params",
						"type": "string[]"
					},
					{
						"internalType": "string",
						"name": "path",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "data_type",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "types",
						"type": "string[]"
					}
				],
				"internalType": "struct Formulas.Param[]",
				"name": "params",
				"type": "tuple[]"
			}
		],
		"name": "pushFunction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "int256",
						"name": "id",
						"type": "int256"
					},
					{
						"internalType": "string",
						"name": "action_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "price",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "product_name",
						"type": "string"
					}
				],
				"internalType": "struct Formulas.Action[]",
				"name": "actions",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "params",
						"type": "string[]"
					},
					{
						"internalType": "string",
						"name": "path",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "data_type",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "types",
						"type": "string[]"
					}
				],
				"internalType": "struct Formulas.Param[]",
				"name": "params",
				"type": "tuple[]"
			}
		],
		"name": "pushRule",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "params",
						"type": "string[]"
					},
					{
						"internalType": "string",
						"name": "path",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "data_type",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "types",
						"type": "string[]"
					}
				],
				"internalType": "struct Formulas.Param[]",
				"name": "params",
				"type": "tuple[]"
			}
		],
		"name": "updateFunction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "company",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "updateProductJson",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "int256",
						"name": "id",
						"type": "int256"
					},
					{
						"internalType": "string",
						"name": "action_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "price",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "product_name",
						"type": "string"
					}
				],
				"internalType": "struct Formulas.Action[]",
				"name": "actions",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "params",
						"type": "string[]"
					},
					{
						"internalType": "string",
						"name": "path",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "data_type",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "types",
						"type": "string[]"
					}
				],
				"internalType": "struct Formulas.Param[]",
				"name": "params",
				"type": "tuple[]"
			}
		],
		"name": "updateRule",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "a",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "b",
				"type": "int256"
			}
		],
		"name": "add",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "a",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "b",
				"type": "int256"
			}
		],
		"name": "avg",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "where",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "what",
				"type": "string"
			}
		],
		"name": "contain",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "a",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "b",
				"type": "int256"
			}
		],
		"name": "div",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "a",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "b",
				"type": "string"
			}
		],
		"name": "exactlyMatch",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFormula",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "myFormula",
						"type": "string"
					}
				],
				"internalType": "struct Formulas.AvailableFormula[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFunction",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "category",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string[]",
								"name": "params",
								"type": "string[]"
							},
							{
								"internalType": "string",
								"name": "path",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "data_type",
								"type": "string"
							},
							{
								"internalType": "string[]",
								"name": "types",
								"type": "string[]"
							}
						],
						"internalType": "struct Formulas.Param[]",
						"name": "params",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Formulas.CustomFunction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProductJson",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "company",
								"type": "string"
							},
							{
								"components": [
									{
										"internalType": "string",
										"name": "color",
										"type": "string"
									},
									{
										"internalType": "uint256",
										"name": "price",
										"type": "uint256"
									}
								],
								"internalType": "struct Formulas.Detail",
								"name": "detail",
								"type": "tuple"
							}
						],
						"internalType": "struct Formulas.Computer[]",
						"name": "computers",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							}
						],
						"internalType": "struct Formulas.Machine",
						"name": "machine",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							}
						],
						"internalType": "struct Formulas.Grocery",
						"name": "grocery",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							}
						],
						"internalType": "struct Formulas.Cloth",
						"name": "cloth",
						"type": "tuple"
					}
				],
				"internalType": "struct Formulas.ProductionJson",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRule",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "int256",
								"name": "id",
								"type": "int256"
							},
							{
								"internalType": "string",
								"name": "action_name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "color",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "price",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "product_name",
								"type": "string"
							}
						],
						"internalType": "struct Formulas.Action[]",
						"name": "actions",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "category",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string[]",
								"name": "params",
								"type": "string[]"
							},
							{
								"internalType": "string",
								"name": "path",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "data_type",
								"type": "string"
							},
							{
								"internalType": "string[]",
								"name": "types",
								"type": "string[]"
							}
						],
						"internalType": "struct Formulas.Param[]",
						"name": "params",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Formulas.BusinessRule[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "a",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "b",
				"type": "int256"
			}
		],
		"name": "greaterThan",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "s",
				"type": "string"
			}
		],
		"name": "len",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "a",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "b",
				"type": "int256"
			}
		],
		"name": "lessThan",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "a",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "b",
				"type": "int256"
			}
		],
		"name": "max",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"name": "maxInArray",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "a",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "b",
				"type": "int256"
			}
		],
		"name": "min",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"name": "minInArray",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "a",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "b",
				"type": "int256"
			}
		],
		"name": "mul",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "a",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "pow",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "arr",
				"type": "uint256[]"
			},
			{
				"internalType": "int256",
				"name": "left",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "right",
				"type": "int256"
			}
		],
		"name": "quickSort",
		"outputs": [],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"name": "sort",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_str",
				"type": "string"
			}
		],
		"name": "strToUint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "a",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "b",
				"type": "int256"
			}
		],
		"name": "sub",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"name": "toUpper",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "a",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "b",
				"type": "int256"
			}
		],
		"name": "x",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]