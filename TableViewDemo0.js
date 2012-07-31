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
JyOS.App.Name		= "TableView Demo 0";
JyOS.App.IconId		= JyOS.Images.loadImage(JyOS.Resources.png.table_green);
var calendarImageID	= JyOS.Images.loadImage(JyOS.Resources.png.user);
var webImageID		= JyOS.Images.loadImage(JyOS.Resources.png.greencircle);

var JAVASCRIPT_REFERENCE_WEBSITE_URL = "https://developer.mozilla.org/en/JavaScript/Reference";
var EMAIL_FROM 						 = "support@JyOS.net";
var EMAIL_TO						 = "fredericALTorres@gmail.com";
var HTML_TEMPLATE 					 = "<html><head><style>h1 { font-size:Larger; font-weigth:bold; } body { font-size:48px; font-family:Helvetica }</style></head><body><h1><center>{0}</center></h1><hr/>{1}</body></html>";
 
var MARKDOWN_SAMPLE					 = "JyOS\n----\n\n**JyOS is a JavaScript runtime for iOS, with a set of extensions which\nallow to write limited native apps.**\n\n  - JavaScript 3+\n  - Limited but simple API\n  - Development on Windows with Visual Studio 2010 or Visual Studio Web Developer Express\n\n";


var LOREMIPSUM 						 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum libero eget libero cursus tempus. Integer volutpat, nunc eget elementum fermentum, massa est cursus ante, ac consequat metus lorem at mauris. Vestibulum cursus, sem et ullamcorper tempor, arcu nibh vulputate metus, vitae blandit arcu ipsum sed purus. Sed euismod volutpat nisi id pretium. Pellentesque ante turpis, placerat a sagittis sed, eleifend ut lorem. Mauris in tempor sem. Quisque nulla metus, fringilla nec ultrices a, rutrum ac nulla. Vestibulum justo ipsum, varius id luctus at, lacinia vel eros.";


var mainTableView = new JyOS.TableView("mainTableView", "TableView Demo 0");

mainTableView.load = function() {
 
	var htmlSource = HTML_TEMPLATE.format("Hello World", LOREMIPSUM.replace(new RegExp('\\.', 'gm'), ".<BR/>"));
 
    this.addSection("TableView Demo 0\nList of controls supported");
 
    this.addData([

		{ Type:STRING,			  Id: 'string1', Values: 'Hello World' 																				} ,    
		{ Type:STRING,			  Id: 'string2', Values: 'Hello World', Image:calendarImageID , Accessory: JyOS.Accessory.None						} ,
		{ Type:STRING,			  Id: 'string3', Values: 'Hello World', Image:calendarImageID , Accessory: JyOS.Accessory.DisclosureIndicator		} ,
		{ Type:STRING,			  Id: 'string4', Values: 'Hello World', Image:calendarImageID , Accessory: JyOS.Accessory.DetailDisclosureButton	} ,
		{ Type:STRING,			  Id: 'string5', Values: 'Hello World', Image:calendarImageID , Accessory: JyOS.Accessory.Checkmark					} ,
		  	  
		{ Type:STRING_VALUE1,	  Id: 'string6', Values: ['Hello', 'World'							], 		Image:calendarImageID 			} ,
		{ Type:STRING_VALUE2,	  Id: 'string7', Values: ['Hello', 'World'							], 		Image:calendarImageID 			} ,   
		{ Type:STRING_SUBTITLE,   Id: 'string8', Values: ['Hello', 'World'							], 		Image:calendarImageID 			} ,	
 
		{ Type:STRING_COMPOSED,   Id:'composed1', Values:['Hello World', 'Good day sunshine', JyOS.Date.format(new Date())] },  	    
		        
		// NOT DOCUMENTED { type: BADGE, 		  	  Id: 'badge1',  Values: ['Hello World, This is a Badge', 12		], 	Image:calendarImageID 	} ,
		{ Type:BOOLEAN, 		  Id: 'bool1',   Values: ['Bool', 		true						]					 					} ,
		{ Type:DATE, 			  Id: 'date1',   Values: ['Date', 		'4/15/2012'					] 					 					} ,
		{ Type:TIME, 			  Id: 'time1',	 Values: ['Time', 		'01:02 AM'					] 					 					} ,
		{ Type:SLIDER, 		  	  Id: 'slider1', Values: ['Slider', 	0.5, 0, 1					] 				 						} ,
		{ Type:LIST, 			  Id: 'list1',   Values: ['List', 		'B', ['A', 'B', 'C'] 		] 					 					} ,
		{ Type:LIST_MULTISELECT,  Id: 'list2',   Values: ['Multi Select List', [1, 3, 5], [1, 2, 3, 4, 5]] 					 				} ,	
		{ Type:HTML,			  Id: 'html1',   Values: ["JavaScript Ref - WebSite", JAVASCRIPT_REFERENCE_WEBSITE_URL], Image:webImageID	} ,
		{ Type:HTML,			  Id: 'html2',	 Values: ["Html Text", htmlSource],										 Image:webImageID   } ,	  		
		{ Type:HTML,			  Id:'markdown1',Values: ["Markdown", JyOS.Markdown.toCompleteHtml("Markdown Sample", MARKDOWN_SAMPLE)],			 Image:webImageID   } 	  		

  	]);
  	
	this.string4.detailDisclosureButtonClick = function() {
	
		alert("You clicked on the Detail Disclosure Button - string4");
	}
	this.click = function(v) {	
	
		alert("General click handler " + v.Id);
	}
	this.addRightBarButton("Show Data");
 	
    this.RightBarButton.click = function () {
     
  	 	this.Parent.showData();
    }       
	this.showData = function () {
		var
			s = JSON.stringify(this.getData());
			
		print(s); 
		alert(s);
	}
	this.getFormatedDataForEMail = function(o) {
    	var 
    		l = [], key;
    	
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