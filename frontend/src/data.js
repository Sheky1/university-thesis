import fordFocus from "./images/ford-focus.jpg";
import audiA4 from "./images/audi-a4.jpg";
import toyotaCorolla from "./images/toyota-corolla.jpg";
import vwTouareg from "./images/vw-touareg.jpg";
import renaultTalisman from "./images/renault-talisman.jpg";
import logo1 from "./images/logo1.jpg";
import logo2 from "./images/logo2.png";
import logo3 from "./images/logo3.png";

export default {
	agencies: [
		{
			username: "agency",
			password: "1",
			id: 0,

			vehicles: [
				{
					name: "Ford Focus",
					slug: "ford-focus",
					capacity: 5,
					type: "Dizel",
					plates: "BG-1234-HF",
					image: fordFocus,
					price: 30,
					transmission: "Manuel",
					size: "Srednje vozilo",
				},
				{
					name: "Ford Focus",
					slug: "ford-focus",
					capacity: 5,
					type: "Dizel",
					plates: "BG-3214-HF",
					image: fordFocus,
					price: 30,
					transmission: "Manuel",
					size: "Srednje vozilo",
				},
				{
					name: "Ford Focus",
					slug: "ford-focus",
					capacity: 5,
					type: "Dizel",
					plates: "BG-6886-HF",
					image: fordFocus,
					price: 30,
					transmission: "Manuel",
					size: "Srednje vozilo",
				},
				{
					name: "Toyota Corolla",
					slug: "toyota-corolla",
					capacity: 5,
					type: "Benzin",
					plates: "BG-3129-MH",
					image: toyotaCorolla,
					price: 40,
					transmission: "Manuel",
					size: "Srednje vozilo",
				},
				{
					name: "Renault Talisman",
					slug: "renault-talisman",
					capacity: 5,
					type: "Dizel",
					plates: "KI-516-BA",
					image: renaultTalisman,
					price: 45,
					transmission: "Automatik",
					size: "Veliko vozilo",
				},
			],

			reservations: [
				{
					name: "Miljan",
					lastName: "Peles",
					email: "ada.peles@gmail.com",
					phone: "+381692250451",
					code: "KiASCiCAB",
					status: "approved",
					price: 200,
				},
				{
					name: "Dimitrije",
					lastName: "Sejat",
					email: "dsejat@gmail.com",
					phone: "+381691160311",
					code: "SCIAnCLmp",
					status: "completed",
					price: 100,
				},
				{
					name: "John",
					lastName: "Doe",
					email: "johndoe@gmail.com",
					phone: "+38141692831",
					code: "ASDlkjVCN",
					status: "declined",
					price: 150,
				},
				{
					name: "Demo",
					lastName: "Demo",
					email: "demo@demo.com",
					phone: "+123456789",
					code: "DEMOOMED",
					status: "approved",
					price: 193,
				},
			],

			additions: [
				{
					name: "GPS",
					price: 20,
				},
				{
					name: "Dodatni vozac",
					price: 15,
				},
				{
					name: "Klima uredjaj",
					price: 10,
				},
				{
					name: "Nosac za skije",
					price: 20,
				},
			],

			sizes: [
				{
					name: "Veliko vozilo",
				},
				{
					name: "Srednje vozilo",
				},
				{
					name: "Malo vozilo",
				},
			],

			fuel: [
				{
					name: "Dizel",
				},
				{
					name: "Benzin",
				},
				{
					name: "Hibrid",
				},
			],
		},
		{
			username: "b",
			password: "b",
			id: 1,

			vehicles: [
				{
					name: "VW Touareg",
					slug: "vw-touareg",
					capacity: 5,
					type: "Dizel",
					plates: "SO-1235-TA",
					image: vwTouareg,
					price: 30,
					transmission: "Manuel",
					size: "Veliko vozilo",
				},
				{
					name: "Audi A4",
					slug: "audi-a4",
					capacity: 5,
					type: "Benzin",
					plates: "BG-123-LG",
					image: audiA4,
					price: 60,
					transmission: "Automatik",
					size: "Srednje vozilo",
				},
			],
		},
		{
			username: "Renter",
			password: "renter",
			id: 2,
		},
	],

	admin: {
		username: "admin",
		password: "1",
		cities: [
			{
				name: "Beograd",
				id: 1,
			},
			{
				name: "Sarajevo",
				id: 2,
			},
			{
				name: "Banja Luka",
				id: 3,
			},
		],
		currencies: [
			{
				name: "KM",
			},
			{
				name: "EUR",
			},
			{
				name: "RSD",
			},
		],

		agencies: [
			{
				name: "Rent agencija",
				slug: "rent",
				logo: logo1,
				email: "rentagencija@gmail.com",
				username: "rent",
				password: "rentpw",
				address: "Rent demo 35, Sarajevo",
				phone: "+31231926912",

				vehicles: [
					{
						name: "Ford Focus",
						slug: "ford-focus",
						capacity: 5,
						type: "Dizel",
						plates: "BG-1234-HF",
						image: fordFocus,
						price: 30,
						transmission: "Manuel",
						size: "Srednje vozilo",
					},
					{
						name: "Ford Focus",
						slug: "ford-focus",
						capacity: 5,
						type: "Dizel",
						plates: "BG-3214-HF",
						image: fordFocus,
						price: 30,
						transmission: "Manuel",
						size: "Srednje vozilo",
					},
					{
						name: "Ford Focus",
						slug: "ford-focus",
						capacity: 5,
						type: "Dizel",
						plates: "BG-6886-HF",
						image: fordFocus,
						price: 30,
						transmission: "Manuel",
						size: "Srednje vozilo",
					},
					{
						name: "Toyota Corolla",
						slug: "toyota-corolla",
						capacity: 5,
						type: "Benzin",
						plates: "BG-3129-MH",
						image: toyotaCorolla,
						price: 40,
						transmission: "Manuel",
						size: "Srednje vozilo",
					},
					{
						name: "Renault Talisman",
						slug: "renault-talisman",
						capacity: 5,
						type: "Dizel",
						plates: "KI-516-BA",
						image: renaultTalisman,
						price: 45,
						transmission: "Automatik",
						size: "Veliko vozilo",
					},
				],

				reservations: [
					{
						name: "Miljan",
						lastName: "Peles",
						email: "ada.peles@gmail.com",
						phone: "+381692250451",
						code: "KiASCiCAB",
						status: "approved",
						price: 200,
					},
					{
						name: "Dimitrije",
						lastName: "Sejat",
						email: "dsejat@gmail.com",
						phone: "+381691160311",
						code: "SCIAnCLmp",
						status: "completed",
						price: 100,
					},
					{
						name: "John",
						lastName: "Doe",
						email: "johndoe@gmail.com",
						phone: "+38141692831",
						code: "ASDlkjVCN",
						status: "declined",
						price: 150,
					},
					{
						name: "Demo",
						lastName: "Demo",
						email: "demo@demo.com",
						phone: "+123456789",
						code: "DEMOOMED",
						status: "approved",
						price: 193,
					},
				],
			},
			{
				name: "Demo agencijademo",
				slug: "demo",
				logo: logo2,
				email: "demoagencija@demo.com",
				username: "demo",
				password: "demopw",
				address: "Demo demo 123, Beograd",
				phone: "+12315125124",

				vehicles: [
					{
						name: "VW Touareg",
						slug: "vw-touareg",
						capacity: 5,
						type: "Dizel",
						plates: "SO-1235-TA",
						image: vwTouareg,
						price: 30,
						transmission: "Manuel",
						size: "Veliko vozilo",
					},
					{
						name: "Audi A4",
						slug: "audi-a4",
						capacity: 5,
						type: "Benzin",
						plates: "BG-123-LG",
						image: audiA4,
						price: 60,
						transmission: "Automatik",
						size: "Srednje vozilo",
					},
				],

				reservations: [
					{
						name: "Miljan",
						lastName: "Peles",
						email: "ada.peles@gmail.com",
						phone: "+381692250451",
						code: "KiASCiCAB",
						status: "approved",
						price: 200,
					},
					{
						name: "Dimitrije",
						lastName: "Sejat",
						email: "dsejat@gmail.com",
						phone: "+381691160311",
						code: "SCIAnCLmp",
						status: "completed",
						price: 100,
					},
					{
						name: "John",
						lastName: "Doe",
						email: "johndoe@gmail.com",
						phone: "+38141692831",
						code: "ASDlkjVCN",
						status: "declined",
						price: 150,
					},
					{
						name: "Demo",
						lastName: "Demo",
						email: "demo@demo.com",
						phone: "+123456789",
						code: "DEMOOMED",
						status: "approved",
						price: 193,
					},
				],
			},
			{
				name: "Renter demo agencija",
				slug: "renter-demo",
				logo: logo3,
				email: "demorenter@gmail.demo",
				username: "renterag",
				password: "renteragpw",
				address: "Renter demo 164, Beograd",
				phone: "+5123412341",

				vehicles: [
					{
						name: "VW Touareg",
						slug: "vw-touareg",
						capacity: 5,
						type: "Dizel",
						plates: "SO-1235-TA",
						image: vwTouareg,
						price: 30,
						transmission: "Manuel",
						size: "Veliko vozilo",
					},
					{
						name: "Audi A4",
						slug: "audi-a4",
						capacity: 5,
						type: "Benzin",
						plates: "BG-123-LG",
						image: audiA4,
						price: 60,
						transmission: "Automatik",
						size: "Srednje vozilo",
					},
				],

				reservations: [
					{
						name: "Miljan",
						lastName: "Peles",
						email: "ada.peles@gmail.com",
						phone: "+381692250451",
						code: "KiASCiCAB",
						status: "approved",
						price: 200,
					},
					{
						name: "Dimitrije",
						lastName: "Sejat",
						email: "dsejat@gmail.com",
						phone: "+381691160311",
						code: "SCIAnCLmp",
						status: "completed",
						price: 100,
					},
					{
						name: "John",
						lastName: "Doe",
						email: "johndoe@gmail.com",
						phone: "+38141692831",
						code: "ASDlkjVCN",
						status: "declined",
						price: 150,
					},
					{
						name: "Demo",
						lastName: "Demo",
						email: "demo@demo.com",
						phone: "+123456789",
						code: "DEMOOMED",
						status: "approved",
						price: 193,
					},
				],
			},
		],
	},
};
