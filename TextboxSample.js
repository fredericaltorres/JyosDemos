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
 
JyOS.App.Name 	= "Textboxes Samples";
JyOS.App.IconId	= JyOS.Images.loadImage(JyOS.Resources.png.paperpencil);
 
/////////////////////////////////////////////////////////////////

var controlSamplesTableView = new JyOS.TableView("controlSamplesTableView", "Control Sample Demo");

controlSamplesTableView.load = function() {
 
	var $this = this;
	
    this.addSection("Controls");

   	this.addData({
        Type   : TEXTBOX,
        Id     : 'txtLastName', 		 
        Values : ['LastName', 'Torres']
    });
   	this.addData({ 
        Type              : TEXTBOX, 
        Id                : 'txtPhrase',		 
        Values            : ['Phrase'],
        KeyboardType      : JyOS.KeyboardType.Default, 
        AutocorrectionType: true
    });   
    this.addData({ 
        Type              : TEXTBOX,
        Id                : 'txtCapitalization', 
        Values            : ['Capital'], 
        KeyboardType      : JyOS.KeyboardType.Default, 
        Autocapitalization: JyOS.Autocapitalization.Sentences
    });
    this.addData({ 
        Type        : TEXTBOX, 
        Id          : 'txtAscii', 	     
        Values      : ['Ascii'], 
        KeyboardType: JyOS.KeyboardType.Ascii
    });
    this.addData({ 
        Type        : TEXTBOX,
        Id          : 'txtNumbersAndP',
        Values      : ['Numbers/Punctuation'], 
        KeyboardType: JyOS.KeyboardType.NumbersAndPunctuation
    });
    this.addData({ 
        Type        : TEXTBOX, 
        Id          : 'txtPhoneNumber', 	 
        Values      : ['Number'], 
        KeyboardType: JyOS.KeyboardType.Numbers				
    });
    this.addData({ 
        Type        : TEXTBOX, 
        Id          : 'txtDecimal',     
        Values      : ['Decimal'],
        KeyboardType: JyOS.KeyboardType.Decimal
    });
   	this.addData({ 
        Type        : TEXTBOX, 
        Id          : 'txtEmail', 		 
        Values      : ['Email'],
        KeyboardType: JyOS.KeyboardType.Email
    });
   	this.addData({ 
        Type        : TEXTBOX, 
        Id          : 'txtUrl', 			 
        Values      : ['Url'], 
        KeyboardType: JyOS.KeyboardType.Url
    });
    
    this.addSection("");
	this.addData({ 
        Type   : BUTTON, 
        Id     : 'OK', 
        Values : 'OK!' 
    });

	this.click = function (v) {
	
		print("General click handler " + v.Id);
	}
	
	this.OK.click = function (v) {
		var
			s = JSON.stringify(this.Parent.getData());
			
		print(s); 
		alert(s);
	}
 
}


function main() {

	JyOS.open(controlSamplesTableView);
}
 