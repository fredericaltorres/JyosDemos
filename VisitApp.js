/*
	JyOS - Source Code Sample
	Copyright (c) 2012 Frederic Torres. All rights reserved.
	 
	THE FILE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
	DEALINGS IN THE SOFTWARE.
*/
var userIconID 			= JyOS.Resources.png.user;
JyOS.App.IconId         = JyOS.Images.loadImage(userIconID);
JyOS.App.Name           = "Visit App";
JyOS.App.Description	= "Medical Visits Tracking App"
JyOS.App.Version        = "1.0";

var SYSTEM_APP_EMAIL    = "fredericaltorres@gmail.com";

var USA                 = { };
USA._statesCsv          = "Arkansas,California,Arkansas,California,Colorado,Connecticut,Delaware,District of Columbia,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming,American Samoa,Guam,Northern Mariana Islands,Puerto Rico,Virgin Islands";
USA.States              = USA._statesCsv.split(',');
USA.Sexes 				= ["Male", "Female"];
 
//////////////////////////////////////////////////////////////////////////////
// Visit Class
// 
function Visit(patientName, billable, networkType, startTime, duration) {

    this.__init__ = function() {
        
        this.PatientName = patientName 	|| "";
        this.Billable    = billable 	|| true;
        this.NetworkType = networkType 	|| "In";
        this.StartTime   = startTime 	|| new Date();
        this.Duration    = sys.ifUndefined(duration, 30);
        this.Guid 		 = JyOS.System.getNewGuid();	
        
        print("Duration:{0}, duration:{1}, Or:{2}".format(this.Duration, duration,(duration || 30).toString()));	
    }
	this.getDuration = function() {
	
		var values = [];
		
		values.push("Duration (Minutes)");
		values.push(this.Duration);
		values.push(Visit.Durations);
		return values;
	}
    this.getDataForMainMenu = function() {
    
    	return [this.PatientName, this.getSummary(), this.getBillableStatus()];
    }
    this.toString = function() {

        return "PatientName:{0}, Time:{1}, Billable:{2}, NetworkType:{3}, Guid:{4}".format(
            this.PatientName, this.getTimeSummary(), this.Billable, this.NetworkType, this.Guid
        );
    }
   this.getBillableStatus = function() {

		return this.Billable ? "Billable" : "";
    }
    this.getSummary = function() {
 
        return "{0}\nNetwork: {1}".format(this.getTimeSummary(), this.NetworkType);
    }
    this.getTimeSummary = function(d) {
       
        return "{0} {1}, {2} Minutes".format(this.getDayFormatted(), this.getTimeFormatted(), this.Duration);
    }
    this.getTimeFormatted = function(){
		
		var d  = this.StartTime;
 	    var hh = (""+d.getHours()).leftPad("0", 2);
	    var mm = (""+d.getMinutes()).leftPad("0", 2);
	    return "{0}:{1}".format(hh, mm);
    }
    this.getDayFormatted = function(){
    	var d = this.StartTime;
        var
            YYYY 	= d.getFullYear(),
            MM		= (""+(d.getMonth()+1)).leftPad("0", 2),
            dd		= (""+d.getDate()).leftPad("0", 2);

	    return "{0}/{1}/{2}".format(MM, dd, YYYY);
    }
    this.__init__();
}
Visit.NetworkTypes 	= ["In", "Out", "Unknown"];
Visit.Durations 	= [0, 15, 30, 45, 60];

//////////////////////////////////////////////////////////////////////////////
// VisitManager Class
// This class is used as a Singleton via VisitManager.Instance
function VisitManager() {
 
	this.__init__ = function() {
	
		var i, visits = Data.getRandomVisits();
 
		for(i=0; i<visits.length; i++) {
		 
			this.addVisit(visits[i]);
		}
		print("{0} Visits".format(this.getCount()));
	}
	this.deleteVisit = function (guid) {
 
		delete this[guid];
	}
	this.addVisit = function (visit) {
	 
		this[visit.Guid] = visit;
	}
	this.getVisit = function(guid) {
	
	 	var i, visits = this.getVisits();
	 	
	 	for(i=0; i < visits.length; i++) 	
	 		if(visits[i].Guid === guid)		
	 			return visits[i];

		return null;
	}
	this.getVisits = function() {
		var 
			ids = [], k;
			
		for(k in this)
			if(!sys.isFunction(this[k]))
				ids.push(this[k]);
				
		return ids;
	}
	this.getIDs = function() {
		var 
			vs = [], k;
			
		for(k in this)
			if(!sys.isFunction(this[k]))
				vs.push(k);
				
		return vs;
	}
	this.getCount = function() {
	
		return this.getIDs().length;
	}
	this.__init__();
}

VisitManager.Instance = null; // << Singleton instance
 
//////////////////////////////////////////////////////////////////////////////
// Data Object (Singleton)
//
var Data 		= { };
Data.Customers 	= 'Marion, Erickson\nRobin, Wise\nHubert, Maxwell\nEdmund, Hunt\nMarsha, Frank\nJason, Fernandez\nIan, Sharp\nOpal, Fletcher\nWade, Strickland\nAudrey, Horton\nJan, Flores\nGuadalupe, Scott\nElbert, Dawson\nNatalie, Ross\nHenry, Kim\nLillie, Lindsey\nEbony, Patterson\nKevin, Gutierrez\nNicholas, Yates\nAlfredo, Wong\nDarrel, Nichols\nMarianne, Caldwell\nDale, Adkins\nNadine, Brock\nDan, Adams\nJacqueline, Morgan\nPhil, Robbins\nWanda, Pope\nCarl, Tucker\nPenny, Santos\nHugh, Jenkins\nCedric, Bowman\nCasey, Palmer\nLewis, Nash\nRamona, Hubbard\nNicolas, Simmons\nTaylor, Allison\nBert, Lynch\nRobyn, Cole\nRita, Richards\nKim, Morrison\nAndre, Powell\nSonja, Day\nJan, Parsons\nPeggy, Goodman\nKirk, Reeves\nJacquelyn, Todd\nHenrietta, Franklin\nFelipe, Gilbert\nKelly, Fox';

Data.getCustomers = function(addblankEntry) {

	var s = this.Customers;
	if(addblankEntry){
		s = "\n" + s; // Add a blank entry
	}
	return s.split('\n').sort();
}
Data.getRandomValue = function(values) {
    var
        max, index;
        
    max 	= values.length;
    index 	= Math.floor(Math.random()*max);
    return values[index];
}
Data.getRandomCustomer = function() {
 
	return this.getRandomValue(this.getCustomers());
}
Data.getRandomVisits = function(){
    var
    	refDate = new Date(),
    	visits 	= [], v, i, 
    	maxData = 4;//2;
    	
    refDate.addMinutes(maxData*(-100));

    for(i=0; i<maxData; i++) {

        v               = new Visit();
        v.Billable      = Data.getRandomValue([true, false]);
        v.PatientName   = Data.getRandomCustomer();
        v.NetworkType   = Data.getRandomValue(Visit.NetworkTypes);
        v.StartTime     = new Date(refDate)        
        v.Duration		= Data.getRandomValue(Visit.Durations);
        
        refDate.addMinutes(Math.random()*90);
        visits.push(v);
    }
    return visits;
}

var visitEditTableView = null;

//////////////////////////////////////////////////////////////////////////////
// editVisit method
// Global method to open a visit object in edit or add mode
function editVisit(visit, newVisit) {

	visitEditTableView = new JyOS.TableView("visitEditTableView", "Visit"); 
	var $this = visitEditTableView;
	
	newVisit = sys.ifUndefined(newVisit, false);
		 
	$this.load = function() {
		var 
			patientControl;
			
		print("Edit/New:{0} visit:{1}".format(newVisit, visit.toString()));
		
		this.addSection("Information");
		
		if(newVisit) { 
			patientControl = { Type:LIST, 		   Id:'PatientName', Values:['Patient', visit.PatientName, Data.getCustomers(true)] };
		}
		else {
			patientControl = { Type:STRING_VALUE1, Id:'PatientName', Values:['Patient', visit.PatientName], Accessory: JyOS.Accessory.None	 };
		}
		
    	this.addData([
    		patientControl,	
    		{ Type:BOOLEAN, Id:'Billable',    Values:['Billable',	visit.Billable ] },	
    		{ Type:LIST,    Id:'NetworkType', Values:['Network', 	visit.NetworkType, 			Visit.NetworkTypes] },
    		{ Type:TEXTBOX, Id:'Day',         Values:['Day', 		visit.getDayFormatted()],  	KeyboardType: JyOS.KeyboardType.NumbersAndPunctuation },
    		{ Type:TEXTBOX, Id:'StartTime',   Values:['Start', 		visit.getTimeFormatted()],  KeyboardType: JyOS.KeyboardType.NumbersAndPunctuation },
    		{ Type:LIST,    Id:'Duration',    Values:visit.getDuration() },  	
    	]);
    	
    	this.addRightBarButton("Email");
 	
	    this.RightBarButton.click = function () {
	   		var 
	   			o = $this.getData();
	   			
	   		if(!newVisit){ // in this case the value is an array, the first value is the word Patient that we skip
	   			o.PatientName.Value = [o.PatientName.Value[1]];
	   			//o.PatientName.DataType = "String";
	   		}
	   		print(JSON.stringify(o));
		    JyOS.Email.send(SYSTEM_APP_EMAIL, undefined, "Visit Information:{0} - {1}".format(o.PatientName.Value, o.Day.Value), $this.getFormatedDataForEMail(o)); 
	    }
	}	
	$this.hide = function(){
	
		print("hide() event was called");
	}
	$this.unload = function() {
		var
			data = this.getData();
  
 		visit.Billable    = data.Billable.Value;
 		visit.NetworkType = data.NetworkType.Value;
 		visit.Duration    = data.Duration.Value;				
 		visit.StartTime	  = new Date("{0} {1}".format(data.Day.Value, data.StartTime.Value));
 	 
 		if(newVisit) {		
 			visit.PatientName = data.PatientName.Value; // Only in the case of a new visit we set the patient name
 			if(visit.PatientName) {
				VisitManager.Instance.addVisit(visit);	
				mainTableView.populateTableView(); 	// Re populate the tableview
				mainTableView.setAsDirty(); 		// Ask the tableview to be reloaded
			}
		}
		else {
			mainTableView.setValues(visit.Guid, visit.getDataForMainMenu());
		}
	}
	$this.getFormatedDataForEMail = function(o) {
    	var 
    		v, l = [], key;
    	
    	o = o || this.getData();
    		
    	for(key in o) {
	 
			if(o[key].DataType == "Date") {
			
				v = JyOS.Date.format(o[key].Value);
			}
			else {
				v =  o[key].Value;
			}
    		l.push("{0}: {1}".format(key, v));
    	}
    	return l.join("\n");
    }
	JyOS.open($this);
}
 
//////////////////////////////////////////////////////////////////////////////
// The mainTableView imnplementation
//
var mainTableView = new JyOS.TableView("mainTableView", "Visits App", /*enableSearch:*/true, JyOS.UITableViewStyle.Plain, /*supportEditMode:*/true);

mainTableView.populateTableView = function () {
	var
		$this = this;
 
 	this.clear();
  	this.addSection("{0} Visits".format(VisitManager.Instance.getCount()));  
  		
   	VisitManager.Instance.getVisits().forEach(function(v){
   	
   		$this.addData({ Type:STRING_COMPOSED, Id:v.Guid, Values:v.getDataForMainMenu(), Images:userIconID });   	
   	});
}

mainTableView.load = function () {
	var 
		$this = this;
 
 	this.populateTableView();
	this.EnableSearch = true;
	this.addRightBarButton(JyOS.UIBarButtonSystemItem.Organize);
 	
    this.RightBarButton.click = function () {
   
    	var editOption 	= "Delete", newOption = "New", cancelOption = "Cancel";
    	var buttons 	= [newOption, editOption, cancelOption];
		
		JyOS.ActionSheet("Options", buttons, 1, 2);
		
		JyOS.ActionSheet.click = function(index) {
 
			switch(buttons[index]) {
		
				case editOption: $this.startEditMode(); break; 					
				case newOption:  $this.newVisit(); 		break; 
			}
		}    
	}
	this.startEditMode = function() {
 
		$this.setEditMode(!$this.getEditMode());
		print("Edit mode {0}", $this.getEditMode());
	}	
    this.newVisit = function() {	
    
		editVisit(new Visit(), true);	 
    }    
	this.click = function(tableViewItem) {	 
 
		editVisit(VisitManager.Instance.getVisit(tableViewItem.Id));	 	
	}
	this.removeData = function(tableViewItem) {	 
 
		VisitManager.Instance.deleteVisit(tableViewItem.Id);		 
	}
}

function main() {

	VisitManager.Instance = new VisitManager();
    JyOS.open(mainTableView);
}
