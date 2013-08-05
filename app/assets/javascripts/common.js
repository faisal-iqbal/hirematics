function generate_linked_in_profile_html(linked_in_profile) {    
    if(linked_in_profile.person != null)
    {
        var linked_in_profile_html =  '';
     
        linked_in_profile_html +=  '<strong class="linkedin-title">'+linked_in_profile.person.firstName+' '+linked_in_profile.person.lastName+'</strong>';
        
        if(linked_in_profile.person.headline != null && linked_in_profile.person.headline.length>0)
        {
            linked_in_profile_html += '<br/>'+linked_in_profile.person.headline;
        }
     
        //work history
        if(linked_in_profile.person.positions != null && linked_in_profile.person.positions.values !=null)
        {
            var currentHeader= false;
            for(i=0;i<linked_in_profile.person.positions.values.length; i++)
            {
                if(linked_in_profile.person.positions.values[i].isCurrent)
                {
                    if(currentHeader == false)
                    {
                        linked_in_profile_html +='<br/><strong class="linkedin-title">Current</strong><br/><ul>' ;
                        currentHeader=true;
                    }
                    linked_in_profile_html += '<li>' + linked_in_profile.person.positions.values[i].title;
                }
            }
               
            if(i>0) {
                linked_in_profile_html += '</ul>';
            }
         
            //for past
            var pastHeader= false;
            for(i=0;i<linked_in_profile.person.positions.values.length; i++)
            {
                if(linked_in_profile.person.positions.values[i].isCurrent == false)
                {
                    if(pastHeader == false)
                    {
                        linked_in_profile_html +='<strong class="linkedin-title">Past</strong><ul>';
                        pastHeader= true;
                    }
                    linked_in_profile_html += '<li>' + linked_in_profile.person.positions.values[i].title ;
                }
		
            }
            
            if(i>0) {
                linked_in_profile_html += '</ul>';
            }
        }
          
        //education
        if(linked_in_profile.person.educations != null && linked_in_profile.person.educations.values != null)
        {
            linked_in_profile_html += '<strong class="linkedin-title">Education</strong><ul>';
            
            for(i=0;i<linked_in_profile.person.educations.values.length; i++)
            {
                linked_in_profile_html += '<li>' + linked_in_profile.person.educations.values[i].schoolName;
            }
            linked_in_profile_html += "</ul>";
        } 
        
        //work
        if(linked_in_profile.person.positions != null && linked_in_profile.person.positions.values != null)
        {
            linked_in_profile_html += '<strong class="linkedin-title">Experience</strong>';
            
            for(i=0;i<linked_in_profile.person.positions.values.length; i++)
            {
                if(i > 0) {
                    linked_in_profile_html += '<br/>';
                }
                
                if(linked_in_profile.person.positions.values[i].title != null && linked_in_profile.person.positions.values[i].title != '')
                {
                    linked_in_profile_html += '<br/><strong>'+ linked_in_profile.person.positions.values[i].title
                }
                
                if(linked_in_profile.person.positions.values[i].startDate != null)
                {
                    linked_in_profile_html += ',';
                    
                    if(linked_in_profile.person.positions.values[i].startDate.month != null) {
                        linked_in_profile_html += ' ' + get_month_name(linked_in_profile.person.positions.values[i].startDate.month);
                    }
                    
                    if(linked_in_profile.person.positions.values[i].startDate.year != null) {
                        linked_in_profile_html += ' ' + linked_in_profile.person.positions.values[i].startDate.year;
                    }
                }
                
                if(linked_in_profile.person.positions.values[i].endDate != null)
                {
                    if(linked_in_profile.person.positions.values[i].startDate == null) {
                        linked_in_profile_html += ',';
                    }
                    else {
                        linked_in_profile_html += ' -';
                    }
                        
                    if(linked_in_profile.person.positions.values[i].endDate.month != null) {
                        linked_in_profile_html += ' ' + get_month_name(linked_in_profile.person.positions.values[i].endDate.month);
                    }
                    
                    if(linked_in_profile.person.positions.values[i].endDate.year != null) {
                        linked_in_profile_html += ' ' + linked_in_profile.person.positions.values[i].endDate.year;
                    }
                }
                else if(linked_in_profile.person.positions.values[i].startDate != null)
                {
                    linked_in_profile_html += ' - Present';
                }
                
                linked_in_profile_html += '</strong>';
                
                if(linked_in_profile.person.positions.values[i].company.name != null && linked_in_profile.person.positions.values[i].company.name != '')
                {
                    linked_in_profile_html +=  '<br/>' + linked_in_profile.person.positions.values[i].company.name
                }
                
                if(linked_in_profile.person.positions.values[i].company.type != null || linked_in_profile.person.positions.values[i].company.industry != null)
                {                    
                    if(linked_in_profile.person.positions.values[i].company.industry != null && linked_in_profile.person.positions.values[i].company.industry.length >0)
                    {
                        linked_in_profile_html += '<br/>(' + linked_in_profile.person.positions.values[i].company.industry + ')';
                    }
                }
            }
        }
    
        //education details
        if(linked_in_profile.person.educations != null && linked_in_profile.person.educations.values != null)
        {
            linked_in_profile_html +='<br/><strong class="linkedin-title">Education</strong><br/>';
            
            for(i=0;i< linked_in_profile.person.educations.values.length; i++)
            {
                if(i > 0) {
                    linked_in_profile_html += '<br/>';
                }
            
                linked_in_profile_html += '<strong>'+linked_in_profile.person.educations.values[i].schoolName;
                
                if(linked_in_profile.person.educations.values[i].startDate != null)
                {
                    linked_in_profile_html += ', ' + linked_in_profile.person.educations.values[i].startDate.year;
                }
                
                if(linked_in_profile.person.educations.values[i].endDate != null)
                {
                    if(linked_in_profile.person.educations.values[i].startDate == null) {
                        linked_in_profile_html += ', ';
                    }
                    else {
                        linked_in_profile_html += ' - ';
                    }
                    
                    linked_in_profile_html += linked_in_profile.person.educations.values[i].endDate.year;
                }
                else if(linked_in_profile.person.educations.values[i].startDate != null)
                {
                    linked_in_profile_html += ' - Present';
                }
                
                linked_in_profile_html += '</strong>';
                
                if(linked_in_profile.person.educations.values[i].degree != null || linked_in_profile.person.educations.values[i].fieldOfStudy != null)
                {
                    if(linked_in_profile.person.educations.values[i].degree != null && linked_in_profile.person.educations.values[i].degree.length > 0)
                    {
                        linked_in_profile_html += '<br/>' + linked_in_profile.person.educations.values[i].degree;
                    }
                    
                    if(linked_in_profile.person.educations.values[i].fieldOfStudy != null && linked_in_profile.person.educations.values[i].fieldOfStudy.length > 0)
                    {
                        linked_in_profile_html += ',' + linked_in_profile.person.educations.values[i].fieldOfStudy;
                    }
                }
            }
        }
        
        //certifications
        if(linked_in_profile.person.certifications != null && linked_in_profile.person.certifications.values != null)
        {
            linked_in_profile_html += '<br/><strong class="linkedin-title">Certifications</strong>';
            
            for(i=0;i< linked_in_profile.person.certifications.values.length; i++)
            {                
                linked_in_profile_html += '<br/>' + linked_in_profile.person.certifications.values[i].name;
            }
        }
        
        //skills
        if(linked_in_profile.person.skills != null && linked_in_profile.person.skills.values != null)
        {
            linked_in_profile_html +='<br/><strong class="linkedin-title">Skills</strong>';
            
            for(i=0;i< linked_in_profile.person.skills.values.length; i++)
            {
                if(i == 0) {
                    linked_in_profile_html += '<br/>';
                }
                else {
                    linked_in_profile_html += ', ';
                }
                
                linked_in_profile_html += linked_in_profile.person.skills.values[i].skill.name;
            }
        }
        
        //honors
        if(linked_in_profile.person.honors != null && linked_in_profile.person.honors != '')
        {
            linked_in_profile_html +='<br/><strong class="linkedin-title">Honors</strong>';
            linked_in_profile_html += '<br/>' + linked_in_profile.person.honors;
        }
        
        //patents
        if(linked_in_profile.person.patents != null && linked_in_profile.person.patents.values != null)
        {
            linked_in_profile_html += '<br/><strong class="linkedin-title">Patents</strong>';
            
            for(i=0;i<linked_in_profile.person.patents.values.length; i++)
            {                
                linked_in_profile_html += '<br/>' + linked_in_profile.person.patents.values[i].title;
                
                if(linked_in_profile.person.patents.values[i].date != null)
                {
                    linked_in_profile_html += ', ';
                    
                    if(linked_in_profile.person.patents.values[i].date.month != null) {
                        linked_in_profile_html += linked_in_profile.person.patents.values[i].date.month + '/';
                    }
                    
                    if(linked_in_profile.person.patents.values[i].date.day != null) {
                        linked_in_profile_html += linked_in_profile.person.patents.values[i].date.day + '/';
                    }
                    
                    if(linked_in_profile.person.patents.values[i].date.year != null) {
                        linked_in_profile_html += linked_in_profile.person.patents.values[i].date.year;
                    }
                }
            }
        }
        
        //publications
        if(linked_in_profile.person.publications != null && linked_in_profile.person.publications.values != null)
        {
            linked_in_profile_html += '<br/><strong class="linkedin-title">Publications</strong>';
            
            for(i=0;i<linked_in_profile.person.publications.values.length; i++)
            {                
                linked_in_profile_html += '<br/>' + linked_in_profile.person.publications.values[i].title;
                
                if(linked_in_profile.person.publications.values[i].date != null)
                {
                    linked_in_profile_html += ', ';
                    
                    if(linked_in_profile.person.publications.values[i].date.month != null) {
                        linked_in_profile_html += linked_in_profile.person.publications.values[i].date.month + '/';
                    }
                    
                    if(linked_in_profile.person.publications.values[i].date.day != null) {
                        linked_in_profile_html += linked_in_profile.person.publications.values[i].date.day + '/';
                    }
                    
                    if(linked_in_profile.person.publications.values[i].date.year != null) {
                        linked_in_profile_html += linked_in_profile.person.publications.values[i].date.year;
                    }
                }
            }
        }
        
        //languages
        if(linked_in_profile.person.languages != null && linked_in_profile.person.languages.values != null)
        {
            linked_in_profile_html +='<br/><strong class="linkedin-title">Languages</strong>';
            
            for(i=0;i< linked_in_profile.person.languages.values.length; i++)
            {
                if(i == 0) {
                    linked_in_profile_html += '<br/>';
                }
                else {
                    linked_in_profile_html += ', ';
                }
                
                linked_in_profile_html += linked_in_profile.person.languages.values[i].language.name;
            }
        }
        
        //recommendations
        if(linked_in_profile.person.recommendationsReceived != null && linked_in_profile.person.recommendationsReceived.values != null)
        {
            linked_in_profile_html += '<br/><strong class="linkedin-title">Recommendations</strong>';
            
            for(i=0;i<linked_in_profile.person.recommendationsReceived.values.length; i++)
            {   
                if(i == 0) {
                    linked_in_profile_html += '<br/>';
                }
                else {
                    linked_in_profile_html +="<br/><br/>"; 
                }
            
                linked_in_profile_html += "Recommender: " + linked_in_profile.person.recommendationsReceived.values[i].recommender.firstName + ' ' + linked_in_profile.person.recommendationsReceived.values[i].recommender.lastName + ' (' + linked_in_profile.person.recommendationsReceived.values[i].recommendationType.code + ')<br/>';
                linked_in_profile_html += '"' + linked_in_profile.person.recommendationsReceived.values[i].recommendationText + '"';
            }
        }
    }
    
    return linked_in_profile_html;
}

function get_month_name(month_number) {
    var months=new Array(12);
    
    months[0]="January";
    months[1]="February";
    months[2]="March";
    months[3]="April";
    months[4]="May";
    months[5]="June";
    months[6]="July";
    months[7]="August";
    months[8]="September";
    months[9]="October";
    months[10]="November";
    months[11]="December";
    
    return months[month_number - 1];
}

function place_validation_error(error, element) {
    var error_msg_div = jQuery('<div></div>');
    error_msg_div.html(error.html());
    
    if(element.siblings('.lightbox-field-effect').length > 0 || 
        element.siblings('.lightbox-field-effect-textarea').length > 0 ||
        element.siblings('label').length == 0) {
        element.siblings('.error-message-text-03').remove();  
        error_msg_div.attr('class', 'error-message-text-03');
        error_msg_div.insertBefore(element);
    }
    else {
        element.siblings('.error-message-text').remove();
        error_msg_div.attr('class', 'error-message-text');
        
        if(jQuery('#new_user_session').length > 0) {
            error_msg_div.css('padding', 0);
        }
        
        error_msg_div.insertBefore(element.siblings('label'));
        
        var error_message_box = jQuery('#error_message_box');
        var notfication_msg_box = jQuery('#notfication_msg_box');
        var error_msg_img = error_message_box.children('img');
        error_message_box.empty();
        error_message_box.append(error_msg_img);
        error_message_box.append(jQuery('#js_validation_gen_error').val());
        error_message_box.show();
        notfication_msg_box.hide();
    }
    
    if (typeof(set_iframe_height) == 'function') {
        set_iframe_height();
    }
}

function remove_validation_error(element, errorClass, validClass) {
    var highlighted_element = jQuery(element);
    highlighted_element.removeClass('error-field');
    
    if(highlighted_element.siblings('.lightbox-field-effect').length > 0 ||
        highlighted_element.siblings('.lightbox-field-effect-textarea').length > 0 ||
        highlighted_element.siblings('label').length == 0) {
        highlighted_element.siblings('.error-message-text-03').remove();
    }
    else {
        highlighted_element.siblings('.error-message-text').remove();
    
        if(jQuery('.error-field').length == 0) {
            jQuery('#error_message_box').hide();
        }
    }
    
    if (typeof(set_iframe_height) == 'function') {
        set_iframe_height();
    }
}

function submit_form(id) {
    if(jQuery("#file_description").length > 0 && 
        jQuery.trim(jQuery("#file_description").val()) == "Description") {
        jQuery("#file_description").val('');
    }
    
    if(id == null) {
        jQuery('#form_submit_btn').click();
    }
    else {
        jQuery('#' + id).click();
    }
    
    var sign_in_btn = jQuery('#sign_in_btn');
    var login_form = jQuery('#new_user_session');
    
    if(sign_in_btn.length > 0 && login_form.length > 0) {
        if(login_form.valid()) {
            sign_in_btn.hide();
            jQuery('#sign_in').hide();
            jQuery('#login_submitting_spinner').show();
        }
        else {
            jQuery('.error-message-text').css('padding', 0);
        }
    }
    
    var job_apply_form = jQuery('#job_apply_form');
    
    if(job_apply_form.length > 0 && job_apply_form.valid()) {
        jQuery('#apply_form_buttons').hide();
        jQuery('#apply_form_submit_spinner').show();
    }
    
    if (typeof(set_iframe_height) == 'function') {
        set_iframe_height();
    }
}

function redirect_to(url) {
    location.href = url;
}