 angular.module('profileApp',[]).factory('MyProfiles',function(){
	var profiles = [];
	return {
	setProfiles : function(sendProfiles){
		profiles = sendProfiles;
		return profiles;
	},
	addProfiles : function(sendProfiles){
		return profiles.push(sendProfiles);
	},
	getProfiles : function(){
		return profiles;
	}
}
}).controller('detailsController', function(){
	
}).controller('profilearrayController',['MyProfiles',function(MyProfiles){
	this.profiles = [{
		//img:'https://media.licdn.com/mpr/mpr/shrink_100_100/p/4/005/023/1a5/352e980.jpg',
		firstName:'Akash',
		lastName:'Mishra',
		gender:'Male',
		work:'yes',
		dateBirth:'14/2/1995',
		address:'India',
		email:'akashmishra989ha@gmail.com',
		website:'https://github.com/AkashMishraMS/ExoticTravel',
		twitter:'',
		facebook:'',
		linkedIn:'https://www.linkedin.com/in/akash-mishra-7a568071/',
		googlePlus:'https://plus.google.com',
		visible:false,
		paVisible: function(){
			this.visible==true?this.visible=false:this.visible=true;
		}
	 }
//  ,{ 
	// 	img:'https://media.licdn.com/mpr/mpr/shrink_100_100/p/4/005/023/1a5/352e980.jpg',
	// 	firstName:'Pure',
	// 	lastName:'Random',
	// 	gender:'Male',
	// 	dateBirth:'09/12/1990',
	// 	address:'The Internet',
	// 	email:'info@purerandom.co.uk',
	// 	website:'https://www.purerandom.co.uk',
	// 	twitter:'pateman90',
	// 	facebook:'https://www.facebook.com/christopher.pateman.3',
	// 	linkedIn:'https://www.linkedin.com/profile/public-profile-settings?trk=prof-edit-edit-public_profile',
	// 	googlePlus:'https://plus.google.com/u/0/115759722116880665817/posts',
	// 	visible:false,
	// 	paVisible: function(){
	// 		this.visible==true?this.visible=false:this.visible=true;
	// 	}
	 ];
	
	MyProfiles.setProfiles(this.profiles);
	this.profiles  = MyProfiles.getProfiles();
}]).controller('profileformController',['$scope','MyProfiles',function($scope,MyProfiles){
	var profileForm = this;
	profileForm.visible = false;
	profileForm.pfVisible = function(){
		(profileForm.visible === true?profileForm.visible=false:profileForm.visible=true);
		$('.profileForm').toggleClass('profileFormShow');
	}
	profileForm.MaxDate = (new Date()).getDate();
	
	profileForm.profileFormClose = function(ThisprofileForm){
		profileForm.visible=false;
		$scope.pf_form.$setPristine();
		profileForm.profileForm={};
	}
	
	profileForm.addProfile = function(){
		$scope.profileForm.profile.visible = false;
		$scope.profileForm.profile.paVisible =  function(){
			this.visible==true?this.visible=false:this.visible=true;
		};
	console.log($scope.profileForm.profile);	MyProfiles.addProfiles($scope.profileForm.profile);
		$scope.pf_form.$setPristine();
		$scope.profileForm.profile = {};
	profileForm.visible=false;
	}
}]);