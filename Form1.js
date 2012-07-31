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
JyOS.App.Name           = "Form 1 App";
JyOS.App.Version        = "1.0";

var USA                 = { };
USA._statesCsv          = "Arkansas,California,Arkansas,California,Colorado,Connecticut,Delaware,District of Columbia,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming,American Samoa,Guam,Northern Mariana Islands,Puerto Rico,Virgin Islands";
USA.States              = USA._statesCsv.split(',');

var SYSTEM_APP_EMAIL    = "fredericaltorres@gmail.com";

var mainTableView       = new JyOS.TableView("mainTableView", "Employee Information");

mainTableView.load = function () {
 
 	this.addSection("Fill the form and email the data", "Email employee information\nASAP!");
    this.addData({ Type: TEXTBOX,   Id: 'LastName',     Values: ['Last Name'],  KeyboardType: JyOS.KeyboardType.Default, Autocapitalization: JyOS.Autocapitalization.Sentences });
    this.addData({ Type: TEXTBOX,   Id: 'FirstName',    Values: ['First Name'], KeyboardType: JyOS.KeyboardType.Default, Autocapitalization: JyOS.Autocapitalization.Sentences });
    this.addData({ Type: DATE,      Id: 'BirthDate',    Values: ['Birth Date'] });
   									 
    this.addData({ Type: LIST,      Id: 'Sexe',         Values: ['Sexe', 'Male', ['Male', 'Female']] });
    this.addData({ Type: BOOLEAN,   Id: 'UsCitizen',    Values: ['US Citizen', true] });
    this.addData({ Type: LIST,      Id: 'State',        Values: ['State', '', USA.States] });
 
    this.addRightBarButton(JyOS.UIBarButtonSystemItem.Reply);

    this.RightBarButton.click = function () {
    	var 
            o = this.Parent.getData();

        JyOS.Email.send(SYSTEM_APP_EMAIL, undefined, "Employee Information: {0} - {1}".format(o.LastName.Value, o.FirstName.Value), this.Parent.getFormatedDataForEMail(o));
    }    
    this.getFormatedDataForEMail = function(o) {
    	var 
    		l = [ ];
    	
    	o = o || this.getData();
    		
    	for(key in o) {
    		l.push("{0}: {1}".format(key, o[key].Value));
    	}
    	return l.join("\n");
    }
}

function main() {

    JyOS.open(mainTableView);
}
