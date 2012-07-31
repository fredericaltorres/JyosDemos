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
var paperContentImageID = JyOS.Resources.png.paper_content;
JyOS.App.IconId         = JyOS.Images.loadImage(paperContentImageID);
JyOS.App.Name           = "Employee Form App";
JyOS.App.Version        = "1.0";

var USA                 = { };
USA._statesCsv          = "Arkansas,California,Colorado,Connecticut,Delaware,District of Columbia,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming,American Samoa,Guam,Northern Mariana Islands,Puerto Rico,Virgin Islands";
USA.States              = USA._statesCsv.split(',');
USA.Sexes 				= ["Male", "Female"];

var SYSTEM_APP_EMAIL    = "fredericaltorres@gmail.com";

function UserData() {
	var
		_key = "UserData";
		
	this.__init__ = function() {
		var
			i, properties = "LastName,FirstName,BirthDate,Sexe,UsCitizen,State,ZipCode".split(",");
	
		for(i = 0; i < properties.length; i++) {
		
			this[properties[i]] = undefined;
		}	
	}
	this.save = function() {
	
		localStorage.setItem(_key, this);
		return this;
	}
	this.load = function() {
		var 
			k, o = localStorage.getItem(_key, undefined);
					
		for(k in o) {
			 
			print("{0}={1}".format(k, o[k]));
			this[k] = o[k];
		}
		return this;
	}
	this.clear = function() {
 
		localStorage.clear();
		this.__init__();
	}
	this.setFromTableViewData = function(tableViewData) {
		var 
			k;
			
		if(!Sys.isUndefined(tableViewData)) {
		
			for(k in this) {
			
				if(!Sys.isUndefined(tableViewData[k])){
				
					this[k] = tableViewData[k].Value;
				}
			}
		}
		return this;
	}
	this.__init__();
}

var mainTableView = new JyOS.TableView("mainTableView", "Employee Information");

mainTableView.load = function () {
	var
		$this = this;
    
    this.UserData = new UserData().load();
   
   	this.addSection("Fill the form and email the data");
    this.addData([
    
		{ Type: TEXTBOX,   Id: 'LastName',     Values: ['Last Name',  this.UserData.LastName ],  Autocapitalization: JyOS.Autocapitalization.Sentences },
		{ Type: TEXTBOX,   Id: 'FirstName',    Values: ['First Name', this.UserData.FirstName],  Autocapitalization: JyOS.Autocapitalization.Sentences },
		{ Type: DATE,      Id: 'BirthDate',    Values: ['Birth Date', this.UserData.BirthDate] 																					},
		{ Type: LIST,      Id: 'Sexe',         Values: ['Sexe',       this.UserData.Sexe, USA.Sexes ] },
		{ Type: BOOLEAN,   Id: 'UsCitizen',    Values: ['US Citizen', this.UserData.UsCitizen                 ] },
		{ Type: LIST,      Id: 'State',        Values: ['State',      this.UserData.State, USA.States         ] },
		{ Type: TEXTBOX,   Id: 'ZipCode',      Values: ['Zip Code',   this.UserData.ZipCode                   ], KeyboardType: JyOS.KeyboardType.NumbersAndPunctuation }
	]);
	
	this.unload = function(){
		var
			o = this.getData();
		 
		this.UserData.setFromTableViewData(o).save();		 
	}
	
	this.addRightBarButton(JyOS.UIBarButtonSystemItem.Organize);
  
    this.RightBarButton.click = function () { 
    
        var clearOption = "Clear", emailOption = "Email", cancelOption = "Cancel";
    	var buttons 	= [clearOption, emailOption, cancelOption];
	 
		JyOS.ActionSheet("", buttons, 0, 2);
		
		JyOS.ActionSheet.click = function(index) {
			var 
				o;		
				 
			switch(buttons[index]) {
		
				case emailOption :
		    		o = $this.getData();
					print(JSON.stringify(o));
		        	JyOS.Email.send(SYSTEM_APP_EMAIL, undefined, "Employee Information: {0} - {1}".format(o.LastName.Value, o.FirstName.Value), $this.getFormatedDataForEMail(o));
				break; 					
				case clearOption :
					$this.UserData.clear();
					$this.clearData();
				break; 
			}
		}
    }    
    this.getFormatedDataForEMail = function(o) {
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
}

function main() {

    JyOS.open(mainTableView);
}


