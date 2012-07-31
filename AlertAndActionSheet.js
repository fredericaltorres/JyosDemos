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
var smileGrinImageID = JyOS.Images.loadImage(JyOS.Resources.png.smile_grin);
JyOS.App.IconId      = smileGrinImageID;
JyOS.App.Name        = "Alert And ActionSheet";
JyOS.App.Version     = "1.0";

var mainTableView = new JyOS.TableView("mainTableView", JyOS.App.Name);

mainTableView.load = function () {

	this.addSection(JyOS.App.Name);
    this.addData({ Type: STRING, Id: 'alertControl',   Value: 'alert()', Image: smileGrinImageID });
	this.addData({ Type: STRING, Id: 'confirmControl', Value: 'confirm()', Image: smileGrinImageID });
	this.addData({ Type: STRING, Id: 'actionSheetControl', Value: 'actionSheet()', Image: smileGrinImageID });

    this.alertControl.click = function () {

        alert("alertControl");
    }
    this.confirmControl.click = function () {

		confirm.click = function(confirmed){
		
			print(confirmed ? "CONFIRMED" : "REJECTED");
		}
        confirm("confirmControl");
    }
    this.actionSheetControl.click = function () {

       	var newOption = "New", deleteOption = "Delete", cancelOption = "Cancel";
    	var buttons 	 = [newOption, deleteOption, cancelOption];
 	
		JyOS.ActionSheet.click = function(index) {
 
			switch(buttons[index]) {
		
				case deleteOption: 	print("Edit"); 		break; 					
				case newOption:  	print("New");  		break;
				case cancelOption:  print("Cancel");  	break; 
			}
		} 
		JyOS.ActionSheet("Options", buttons, /* Delete Button Index */1, /* Cancel Button Index */2);		
    }
}

function main(){

    JyOS.open(mainTableView);
}