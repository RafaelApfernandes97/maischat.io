
(function ($) {
    "use strict";
    jQuery(document).ready(function ($) {
        $(document).on('submit', '#get_in_touch', function (e) {
            e.preventDefault();
            var name = $('#name').val();
            var subject = $('#subject').val();
            var email = $('#email').val();
            var message = $('#message').val();

            if (!name) {
                 $('#name').removeClass('error');
                 $('#name').addClass('error').attr('placeholder', 'Your Name');
             }else{
                 $('#name').removeClass('error');
             }
           
            if (!subject) {
                 $('#subject').removeClass('error');
                 $('#subject').addClass('error').attr('placeholder', 'Subject');
             }else{
                 $('#subject').removeClass('error');
             }
           
            if (!email) {
                 $('#email').removeClass('error');
                 $('#email').addClass('error').attr('placeholder','Enter Your Email')
             }else{
                 $('#email').removeClass('error');
             }

            if (!message) {
                 $('#message').removeClass('error');
                 $('#message').addClass('error').attr('placeholder','Write Your Message')
             }else{
                 $('#message').removeClass('error');
             }
             
            
            if ( email && message && name ) {
             	$.ajax({
	                 type: "POST",
	                 url:'contact.php',
	                 data:{
                         'name': name,
                         'subject': subject,
                         'email': email,
                         'message': message,
	                 },
	                 success:function(data){
                         $('#get_in_touch').children('.email-success').remove();
                         $('#get_in_touch').prepend('<div class="alert alert-success email-success">' + data + '</div>');
                         $('#name').val('');
                         $('#subject').val('');
                         $('#email').val('');
                         $('#message').val('');
                         $('.email-success').fadeOut(5000);
	                 },
	                 error:function(res){

	                 }
	             });
             }else{
                $('#get_in_touch').children('.email-success').remove();
                $('#get_in_touch').prepend('<div class="alert alert-danger email-success">Somenthing is wrong</div>');
                $('.email-success').fadeOut(5000);
             }
        });
    })

}(jQuery));	
