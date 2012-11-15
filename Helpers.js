function ProfilePrinter(profile, outputTarget) {
			
	var hour;
	var output = "<br>";

	for(hour=0;hour<profile.profile.length;hour++) {
		output += profile.profile[hour] + "<br>";
	}

	document.getElementById(outputTarget).innerHTML = output;
}

function BuildingDataPrinter(building, outputTarget) {
	var key;
	var outputHTML = "";
	var element;
	outputHTML += "<form>";
	for ( key in building ) {
		if ( building.hasOwnProperty(key) ) {
			outputHTML += "<input class='alignRight' type='text' id='" + key + "' onchange='Update()'> : " + key + "<br>";
		}
	}
	outputHTML += "</form>";
	document.getElementById(outputTarget).innerHTML = outputHTML;
	for ( key in building ) {
		if ( building.hasOwnProperty(key) ) {
			element = document.getElementById(key);
			element.value = building[key];
		}
	}
}

function BuildingDataSraper(building) {
	var key;
	var element;
	for ( key in building ) {
		if ( building.hasOwnProperty(key) ) {
			element = document.getElementById(key);
			building[key] = element.value;
		}
	}
}

function Initialize() {

	building = new Building(); 		// global
    constants = new Constants();	// global

    BuildingDataPrinter(building, "buildingData");
}


function Update() {
	BuildingDataSraper(building);
	Run();
	BuildingDataPrinter(building, "buildingData");
}


function Run() {

    var profile;

    var selectorProfile = document.getElementById("selectorProfile");
    var selectorView= document.getElementById("selectorView");

    if( selectorProfile.value == "1" ) {
        profile = HotWaterHeatingEnergyProfile( building, constants);
    }

     if( selectorProfile.value == "2" ) {
        profile = SpaceHeatingEnergyProfile( building, constants);
    }

    if ( selectorView.value == "Hours" ) {
        ProfilePrinter( profile, "output");
    }
    if ( selectorView.value == "Days" ) {
        var day;
        var outputHTML = "<br>";
        for(day=1;day<=365;day++) {
            outputHTML += profile.day(day) + "<br>";
        }
        document.getElementById("output").innerHTML = outputHTML;
    }
    if ( selectorView.value == "Months" ) {
        var month;
        var outputHTML = "<br>";
        for(month=1;month<=12;month++) {
            outputHTML += profile.month(month) + "<br>";
        }
        document.getElementById("output").innerHTML = outputHTML;
    }
    if ( selectorView.value == "Year" ) {
    	var outputHTML = "<br>" + profile.year();
        document.getElementById("output").innerHTML = outputHTML;
    }

    
}