const tracking_id = document.getElementById("tracking-id");
const table = document.getElementsByTagName("tbody");

// const URL = "https://wwwcie.ups.com/rest/Track";
const URL = "./ups/track";


const track = {
	"UPSSecurity": {
		"UsernameToken": {
			"Username": "F_dasha1911",
			"Password": "HelloWorld1911"
		},
		"ServiceAccessToken": {
			"AccessLicenseNumber": "ED5DC864BD11FEA8"
		}
	},
	"TrackRequest": {
		"Request": {
			"RequestOption": "15",
			"TransactionReference": {
				"CustomerContext": "Your Test Case Summary Description"
			}
		},
		"InquiryNumber": "1Z1982F80333404978",
		"TrackingOption": "02"
	}
};

function startSearch() {
	let shipping_List = tracking_id.value.split(" ");
	shipping_List.forEach(id => {
		const request = { ...track, TrackRequest: { ...track.TrackRequest, InquiryNumber: id } };
		getResponse(request);
	});
}

function cleanSearch() {
	tracking_id.value = "";
	table[0].textContent = "";
}


function getResponse(val) {
	fetch(URL, {
		method: "POST",
		headers: new Headers({ "Content-Type": "application/json" }),
		body: JSON.stringify(val)
	}).then(res => {
		if (!res.ok) {
			throw Error(res.statusText);
		} else {
			return res.json()
		}
	}).then(result => {
		if (result.Fault) {
			getErrorResponse(val.TrackRequest.InquiryNumber)
		} else {
			console.log(result.TrackResponse);

			addTrackInfo(result.TrackResponse);
		}
	})
		.catch(error => {
			getErrorResponse(val.TrackRequest.InquiryNumber);
			console.log(error)
		});
}


function addTrackInfo(data) {
	let tr = document.createElement("tr");
	let tdTrackingId = document.createElement("td");
	let tdDescription = document.createElement("td");
	let tdStatus = document.createElement("td");
	let tdState = document.createElement("td");
	let tdSignedForByName = document.createElement("td");
	let tdDate = document.createElement("td");
	let tdPickUp = document.createElement("td");


	let getFormat = (date) => {
		if (date) {
			const regex = new RegExp(/^(\d{4})(\d{2})(\d{2})$/);
			regex.test(date);
			const replacer = (match, year, month, day) => `${year}-${month}-${day}`;
			return date.replace(regex, replacer);
		}
	};

	tdTrackingId.textContent =
		data.Shipment.InquiryNumber.Value;
	tdDescription.textContent =
		(data.Shipment.Package.Activity[0]
		|| data.Shipment.Package.Activity).ActivityLocation.Description;

	tdStatus.textContent =
		(data.Shipment.Package.Activity[0]
		|| data.Shipment.Package.Activity).Status.Description;
	tdSignedForByName.textContent =
		(data.Shipment.Package.Activity[0]
		|| data.Shipment.Package.Activity).ActivityLocation.SignedForByName;
	tdState.textContent =
		(data.Shipment.Package.Activity[0]
		|| data.Shipment.Package.Activity).ActivityLocation.Address.StateProvinceCode;
	tdDate.textContent = getFormat(data.Shipment.Package.Activity.length >= 2
		? data.Shipment.Package.Activity[0].Date
		: data.Shipment.Package.Activity.Date
	);
	// tdStatusCode.textContent = data.Shipment.Package.Activity[0].Status.Code;
	tdPickUp.textContent = getFormat(data.Shipment.PickupDate);

	tr.appendChild(tdTrackingId);
	tr.appendChild(tdState);
	tr.appendChild(tdDescription);
	tr.appendChild(tdStatus);
	tr.appendChild(tdSignedForByName);
	tr.appendChild(tdPickUp);
	tr.appendChild(tdDate);


	table[0].appendChild(tr)
}

function getErrorResponse(value) {
	let tr = document.createElement("tr");
	let tdTrackingId = document.createElement("td");
	let tdDescription = document.createElement("td");
	let tdStatus = document.createElement("td");
	let tdState = document.createElement("td");
	let tdSignedForByName = document.createElement("td");
	let tdDate = document.createElement("td");
	let tdPickUp = document.createElement("td");

	tdTrackingId.textContent = value;
	tdStatus.textContent = "No Data";


	tr.appendChild(tdTrackingId);
	tr.appendChild(tdState);
	tr.appendChild(tdDescription);
	tr.appendChild(tdStatus);
	tr.appendChild(tdSignedForByName);
	tr.appendChild(tdPickUp);
	tr.appendChild(tdDate);


	table[0].appendChild(tr)
}