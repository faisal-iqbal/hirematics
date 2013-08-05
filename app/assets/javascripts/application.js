// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require AnimatedCollapsiblePanel
//= require common
//= require jquery_ujs_hirematics
//= require dynamic
//= require jquery.fancybox-1.3.4.pack
//= require jquery.infieldlabel.min
//= require jquery-ui-timepicker-addon
//= require jquery.validate.min
//= require jquery.form
//= require redbox
//= require stages
//= require wice_grid
//= require active_scaffold
//= require tiny_mce/tiny_mce
//= require_tree .
var updating_message = '<p>Updating...<img src="/images/spinner.gif"/></p>';
var deleting_message = '<p>Deleting...<img src="/images/spinner.gif"/></p>';
var uploading_message = '<p>Uploading...<img src="/images/spinner.gif"/></p>';

jQuery(document).ready(function(){
    jQuery('.fancybox').fancybox();
    jQuery(".fancybox_modal").fancybox({
        modal:      true,
        titleShow:  false
    });
    tinyMCE.init({
        mode : "textareas",
        editor_selector : "mceEditor",
        theme : "advanced",
        theme_advanced_buttons1 : "bold,italic,underline,separator,strikethrough,justifyleft,justifycenter,justifyright, justifyfull,bullist,numlist,separator,fontsizeselect",
        theme_advanced_buttons2 : "undo,redo,link,unlink, spellchecker,code",
        theme_advanced_buttons3 : "",
        plugins : "spellchecker,paste",
        theme_advanced_toolbar_location : "top",
        theme_advanced_toolbar_align : "left",
        theme_advanced_path_location : "bottom",
        force_br_newlines: "true",
        force_p_newlines: "false",
        extended_valid_elements : "a[name|href|target|title|onclick],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],hr[class|width|size|noshade],font[face|size|color|style],span[class|align|style]",
        width : "700"
    });
    jQuery('.prev_page, .next_page').addClass('small-tooltip');

    jQuery("label").inFieldLabels();
      
    jQuery('#user_session_password').focus(function() {
        if(jQuery(this).val().length == 0) {
            jQuery('#password_label').css('opacity', 0.5);
        }
        else {
            jQuery('#password_label').css('opacity', 0);
        }
    });
    
    jQuery('#user_session_password').blur(function() {
        if(jQuery(this).val().length == 0) {
            jQuery('#password_label').css('opacity', 1);
        }
        else {
            jQuery('#password_label').css('opacity', 0);
        }
    });
    
    jQuery('#user_session_password').keyup(function() {
        if(jQuery(this).val().length > 0) {
            jQuery('#password_label').css('opacity', 0);
        }
    });
    
    jQuery('#user_session_email, #user_session_password').keypress(function(e){
        if(e.keyCode == 13) {
            submit_form(); 
        } 
    });
    
    jQuery('#sign_in_btn').click(function(e){
        submit_form();         
        return false;
    });
    
    jQuery('#search_val').keypress(function(e){
        if(e.keyCode == 13) {
            jQuery('#app_search_btn').click();
        } 
    });
    
    jQuery('#user_dropdown_link').click(function() {
        jQuery('#settings_dropdown_box').hide();
        jQuery('#user_dropdown_box').toggle();
        return false;
    });
    
    jQuery('#logout_link').click(function() {
        jQuery('#user_dropdown_box').hide();
    });
    
    jQuery('#settings_dropdown_link').click(function() {
        jQuery('#user_dropdown_box').hide();
        jQuery('#settings_dropdown_box').toggle();
        return false;
    });
    
    jQuery('#persinal_settings_link, #account_settings_link').click(function() {
        jQuery('#settings_dropdown_box').hide();
    });
    
    jQuery(document).click(function(e){
        var event_target_class_name = e.target.className;
        if(event_target_class_name != 'top-applicant-name' && 
            event_target_class_name != 'top-settings-icon') {
            jQuery("#user_dropdown_box").hide();
            jQuery('#settings_dropdown_box').hide();
        }
    });

    jQuery('#apps_archive_btn').click(function() {
        var app_ids = getCheckedValue();
        reload_page_with_new_params(0, 1, 0, 0, app_ids);
        return false;
    });

    jQuery('#apps_unarchive_btn').click(function() {
        var app_ids = getCheckedValue();
        reload_page_with_new_params(0, 0, 1, 0, app_ids);
        return false;
    });
    
    jQuery("#select_all_checkbox, #deselect_all_checkbox, input[id^='ckbNo']").change(function(){
        setTimeout("toggle_bulk_action_box();", 100);
    });
    
    jQuery('#app_show_resume_link').click(function() {
        select_applicant_detail_tab(2);
        location.href = location.href.split('#')[0] + '#resume';        
        return false;
    });
    
    jQuery('#jb_set_tab_1').click(function(){
        select_jobboard_settings_tab(1);
        return false;
    });
    
    jQuery('#jb_set_tab_2').click(function(){
        select_jobboard_settings_tab(2);
        return false;
    });
    
    jQuery('#jb_general_tab_lnk').click(function(){
        select_jobboard_general_hosted_tab(1);
        return false;
    });
    
    jQuery('#jb_hosted_tab_lnk').click(function(){
        select_jobboard_general_hosted_tab(2);
        return false;
    });
    
    jQuery('textarea[maxlength]').keyup(function(){
        var max = parseInt(jQuery(this).attr('maxlength'));
        if(jQuery(this).val().length > max){
            jQuery(this).val(jQuery(this).val().substr(0, jQuery(this).attr('maxlength')));
        }
        jQuery(this).parent().find('#jb_txtarea_chr_left').html((max - jQuery(this).val().length));
    });
    
    jQuery('#jb_general_settings_btn').click(function(){
        jQuery('#jb_general_settings_form').attr('action', '/company/general_settings');
        jQuery('#jb_general_settings_form').attr('target','');
        jQuery('#jb_general_settings_form').submit();
        return false;
    });
    
    jQuery('#jb_general_settings_preview_btn').click(function(){
        jQuery('#jb_general_settings_form').attr('action', '/job/board');
        jQuery('#jb_general_settings_form').attr('target', '_blank');
        jQuery('#jb_general_settings_form').submit();
        return false;
    });

    
    jQuery('#jb_set_logo_save_btn').click(function() {
        submit_form();
        return false;
    });
    
    jQuery('#jb_set_cont_url_save_btn').click(function(){
        submit_form('jb_set_cont_url_submit_btn');
        return false;
    });
    
    jQuery('#jb_set_helper_url_save_btn').click(function(){
        submit_form('jb_set_helper_url_submit_btn');
        return false;
    });

    jQuery('#jb_set_careers_site_url_save_btn').click(function(){
        submit_form('jb_set_careers_site_url_submit_btn');
        return false;
    });
    
    jQuery('#et_add_another_file').click(function() {
        var file_inputs_count_hf = jQuery('#file_inputs_count_hf');
        file_inputs_count_hf.val(parseInt(file_inputs_count_hf.val()) + 1);
        var file_inputs_div = jQuery('#file_inputs_div');
    
        var file_input_div = jQuery('<div></div>');
        file_input_div.attr('id', 'file_input_div_' + file_inputs_count_hf.val());
        file_inputs_div.append(file_input_div); 
    
        var clear_div = jQuery('<div></div>');
        clear_div.attr('class', 'clear');
        file_input_div.append(clear_div);

        var inner_file_input_div = jQuery('<div></div>');
        inner_file_input_div.attr('class', 'field-mrgn');
        file_input_div.append(inner_file_input_div);

        var file_input_elmt = jQuery('<input />');
        file_input_elmt.attr('type', 'file');
        file_input_elmt.attr('size', '20');
        file_input_elmt.attr('id', 'attached_file_' + file_inputs_count_hf.val());
        file_input_elmt.attr('name', 'attached_file_' + file_inputs_count_hf.val());
        inner_file_input_div.append(file_input_elmt);

        var a_elmt = jQuery('<a></a>');
        a_elmt.attr('href', '#');
        a_elmt.html('Remove');
        a_elmt.click(function(){
            jQuery('#' + file_input_div.attr('id')).remove();
            return false;
        });
        inner_file_input_div.append(' ');
        inner_file_input_div.append(a_elmt);
        
        return false;
    });
    
    jQuery('#admin_change_btn').click(function() {
        RedBox.showInline('account_admin_change_confirm_popup');            
        return false;
    });
    
    jQuery('#export_data_btn').click(function() {
        RedBox.showInline('data_export_confirm_popup');            
        return false;
    });
    
    jQuery('#bulk_app_del_link').click(function() {
        APP_IDS = getCheckedValue();
        jQuery.ajax({
            type: 'POST',
            url: '/app/check_for_bulk_applicants',
            data: 'q=' + APP_IDS,
            beforeSend: function(){
                jQuery('#error_message_box').hide();
                RedBox.loading();
            },
            success: function(text){
                if(text == 'true')
                {
                    var final_confirmation_message = APP_IDS.split(',').length > 1 ?
                    CONFIRMATION_MESSAGES_2[1] : CONFIRMATION_MESSAGES_2[0];
                    jQuery('.alrt-msg-text').html(final_confirmation_message);
                    RedBox.cloneWindowContents('app_delete_confirm_popup');
                    RedBox.activateRBWindow();
                }
                else
                {
                    window.location.href = '/app'
                }
            }
        });
        return false;
    });
    
    jQuery('#auto_tweet_jobs_chkbox').change(function() {
        jQuery.ajax({
            type: 'POST',
            url: '/company/auto_jobs_publish_settings',
            data: 'is_auto_tweet_jobs=' + jQuery(this).prop("checked"),
            beforeSend: function(){
                jQuery('#auto_tweet_jobs_chkbox').prop('disabled', true);
                jQuery('#auto_tweet_jobs_spinner').show();
            },
            success: function(html){
                jQuery('#auto_tweet_jobs_spinner').hide();
                jQuery('#auto_tweet_jobs_chkbox').prop('disabled', false);
            }
        });
    });
    
    jQuery('#gen_notification_msg_close_link').click(function() {
        jQuery.ajax({
            type: 'POST',
            url: '/dashboard/hide_alerts',
            beforeSend: function(){
                jQuery('.gen-notfication-msg').hide();
            }
        });
        
        return false;
    });
});

function check_day(){
    $('is_time_ignored').value = "1"
    if($F('day') == "0" || $F('day') == "1"){
        Element.show('set_time');
        Element.hide('time');
        //Element.hide('datetime');
        Element.hide('datetime_cancel');
        Element.hide('specific_datetime');

        if($("day").value == "0")
        {
            var d = new Date();
            $("date_hour").value = d.getHours() + 1<24?d.getHours() + 1:"00";
            $("date_minute").value = "00";
        }
        else if($("day").value == "1")
        {
            $("date_hour").value = "10"
            $("date_minute").value = "00"
        }
    }
    else{
        Element.hide('set_time');
        Element.hide('datetime');
        Element.hide('datetime_cancel');
        Element.hide('time');
        Element.hide('specific_datetime')
        if($F('day')== "5"){
            Element.show('specific_datetime')
            Element.show('datetime');
            $('is_time_ignored').value = "0"

            $("date_hour").value = "10"
            $("date_minute").value = "00"
        }
    }
}

cCheckAll = function (val){		
    for (var i=0; i<ckbCount; i++){
        if($("ckbNo"+i).disabled == false){
            $("ckbNo"+i).checked = val;
        }
    }
}

unCheck = function(){
    $("chkall").checked = false;
}

getCheckedValue = function(){
    var checked_values = '';
    
    for (var i = 0; i < ckbCount; i++) {
        if(jQuery("#ckbNo"+i).prop('checked')){
            checked_values  += jQuery("#ckbNo"+i).val() + ',';
        }
    }
    
    if (checked_values  != '') {
        checked_values  = checked_values .substr(0,checked_values .length-1);			
    }
    
    return checked_values ;
}

function delete_task(task_id, panel) {
    $(task_id+'_task').innerHTML=deleting_message;
    
    new Ajax.Updater(panel, 
        '/task/destroy/' + task_id+'?from=dashboard',
        {
            asynchronous:true,
            evalScripts:true
        });
}

function createCookie(name,value) {
    var date = new Date();
    date.setTime(date.getTime()+(365*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return false;
}

/* YFT effect - courtesy 37Signals */
var Color= new Array();
Color[0] = "ff";
Color[1] = "ee";
Color[2] = "dd";
Color[3] = "cc";
Color[4] = "bb";
Color[5] = "aa";
Color[6] = "99";
Color[7] = "88";

function waittofade() {
    if (document.getElementById('fade')) {
        setTimeout("fadeIn(7)", 20);
    }
}

function fadeIn(where) {
    if (where >= 1) {
        document.getElementById('fade').style.backgroundColor = "#FFFF" + Color[where];
        if (where > 1) {
            where -= 1;
            setTimeout("fadeIn("+where+")", 150);
        } else {
            where -= 1;
            setTimeout("fadeIn("+where+")", 150);
            document.getElementById('fade').style.backgroundColor = "transparent";
        }
    }
}

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

/* Author: raza muhammad ali (mailto: raza.ali@confiz.com)
 * /app/summary add or edit file description related functions --start 
 * 
 * show_box(id) :  opens then text box for file description
 * close_edit(id) :  closes edit mode text box and update and cancel button
 * update_description(id) :  sends data for validating and updating to related file description.
 */

function show_box(id)
{

    Element.hide(id+'_desc')
    Element.hide(id+'_link')
		
    container = document.createElement('p');

    container.id = id + '_edit';
    container.style.fontSize='11px';
    container.style.marginLeft='60px';

    text_box = document.createElement('input');
    text_box.id = id + '_new_desc';
    text_box.type='text';

    art = removeHTMLTags($(id+'_desc').innerHTML);
    text_box.value = art;
    $(container).appendChild(text_box);

    update = document.createElement('a');
    update.innerHTML='update';
    update.style.marginLeft='8px';
    update.href='javascript:update_description(' + id + ');';

    $(container).appendChild(update);

    cancel = document.createElement('a');
    cancel.innerHTML='cancel';
    cancel.style.marginLeft='5px';
    cancel.href='javascript:close_edit(' + id + ');';

    $(container).appendChild(cancel);

    $(id+'_div').appendChild(container);
}

function close_edit(id)
{
    Element.show(id+'_desc');
    Element.show(id+'_link');
    $(id + '_edit').remove();
}

function update_description(id)
{
		
    new Ajax.Updater('',
        '/app/update_file_description/' + id ,
        {
            asynchronous:true,
            evalScripts:true,
            onComplete:function(request)
            {
                if(request.responseText == "Done")
                {
                    if($(id + '_new_desc').value == '')
                    {
                        $(id+'_link').innerHTML = 'add description';
                    }
                    else
                    {
                        $(id+'_link').innerHTML = 'edit';
                    }
                    $(id+'_desc').innerHTML = $(id+'_new_desc').value.escapeHTML();
                    Element.show(id+'_desc');
                    Element.show(id+'_link');
                    $(id + '_edit').remove();
                }
            },
            parameters:'desc=' + $(id + '_new_desc').value
        }
        );
}

/* files description add/edit --end*/

/*app/message_list --start*/
function checkAll(field) {
    for (i = 0; i < field.length; i++) {
        field[i].checked = true ;
    }
}

function uncheckAll(field) {
    for (i = 0; i < field.length; i++)
        field[i].checked = false ;
}

/*added for application summary page highlighting feature.*/
function getElementsByClassName(classname, node) {
    if(!node) node = document.getElementsByTagName("body")[0];

    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");

    for(var i=0,j=els.length; i<j; i++)

        if(re.test(els[i].className))a.push(els[i]);
    return a;
}


var CustomFunctions = {
    insertLocationItem: function(id, cell01_html, cell02_html)
    {
        var loc_table = document.getElementById("location_list")

        if($('no_location_id'))
        {
            loc_table.deleteRow(0);
        }

        var new_row = loc_table.insertRow(loc_table.rows.length);
        new_row.id = 'location_' + id;

        var y=new_row.insertCell(0);
        y.width = '30%';
        y.innerHTML = cell01_html;

        var z=new_row.insertCell(1);
        z.width = '7%';
        z.align = 'center';
        z.innerHTML = cell02_html;
    },

    showNoLocationMessage: function(message)
    {
        var loc_table = document.getElementById("location_list")

        var new_row = loc_table.insertRow(loc_table.rows.length);
        new_row.id = 'no_location_id';

        var y=new_row.insertCell(0);
        y.width = '30%';
        y.innerHTML = message;

        var z=new_row.insertCell(1);
        z.width = '7%';
        z.align = 'center';
        z.innerHTML = '';
    }

}


/* This script and many more are available free online at
The JavaScript Source!! http://javascript.internet.com
Created by: Robert Nyman | http://robertnyman.com/ */
function removeHTMLTags(strInputCode){
    /* 
                This line is optional, it replaces escaped brackets with real ones, 
                i.e. < is replaced with < and > is replaced with >
 */	
    strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1){
        return (p1 == "lt")? "<" : ">";
    });
    var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
    return strTagStrippedText;
}

/**/
clear_user_guide_message_application = function()
{
 
    if($('search_val').value == '')
    {
        $('search_val').style.backgroundImage="none";
    }

}

add_user_guide_message_application = function()
{

    if($('search_val').value == '')
    {
        $('search_val').style.backgroundImage="url(/images/app_search_user_guide.jpg)"
    }

}

change_notify_user = function(index, status)
{
    notify_email_object = document.getElementsByName("notify_email")[index];
    if(status == true)
    {
        notify_email_object.style.display = '';
        notify_email_object.checked = true;
    }
    else
    {
        notify_email_object.style.display = 'none';
        notify_email_object.checked = false;
    }
}

load_ubac_details = function()
{
    $('users-access-right-header').innerHTML = ($('access_right_users').value == '' ? '' : 'Edit - ') + $('users-access-right-header').innerHTML + (($('job_job_title').value == '') ? '' : ' for ' + $('job_job_title').value)

    if($('access_right_users').value != '')
    {
        access_right_objects = document.getElementsByName("access_right");
        notify_email_objects = document.getElementsByName("notify_email");
        for(i=0;i < access_right_objects.length;i++)
        {
            if($('access_right_users').value.include(access_right_objects[i].value))
            {
                access_right_objects[i].checked = true;
                notify_email_objects[i].style.display = '';
                notify_email_objects[i].checked = ($('notify_emails').value.include(notify_email_objects[i].value) ? true : false);
            }
            else
            {
                access_right_objects[i].checked = false;
                notify_email_objects[i].checked = false;
            }
        }
    }
}

/*user access based right -end*/

function trim(str, chars) {
    if(str == null) {
        return '';
    }
    else {
        return ltrim(rtrim(str, chars), chars);
    }
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

getUrlEncodedKey = function(key, query) {
    if (!query)
        query = window.location.search;
    var re = new RegExp("[?|&]" + key + "=(.*?)&");
    var matches = re.exec(query + "&");
    if (!matches || matches.length < 2)
        return "";
    return decodeURIComponent(matches[1].replace("+", " "));
}
setUrlEncodedKey = function(key, value, query) {

    query = query || window.location.search;
    var q = query + "&";
    var re = new RegExp("[?|&]" + key + "=.*?&");
    if (!re.test(q))
        q += key + "=" + encodeURI(value);
    else
        q = q.replace(re, "&" + key + "=" + encodeURIComponent(value) + "&");
    q = q.trimStart("&").trimEnd("&");
    return q[0]=="?" ? q : q = "?" + q;
}

String.prototype.trimEnd = function(c) {
    if (c)
        return this.replace(new RegExp(c.escapeRegExp() + "*$"), '');
    return this.replace(/\s+$/, '');
}
String.prototype.trimStart = function(c) {
    if (c)
        return this.replace(new RegExp("^" + c.escapeRegExp() + "*"), '');
    return this.replace(/^\s+/, '');
}

String.prototype.escapeRegExp = function() {
    return this.replace(/[.*+?^${}()|[\]\/\\]/g, "\\$0");
};

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function setCaretToPos (input, pos) {
    setSelectionRange(input, pos, pos);
}

function preview_file(url){
    window.open(url, 
        '_blank', 
        'width=790,height=770,resizable=yes,scrollbars=yes')
}

function calculate_element_height(element) {
    element.style.overflow = 'hidden';
    var height = element.offsetHeight;
    element.style.overflow = 'visible';
    
    return height;
}

function show_stars(selected_star, max_user_rating) {
    var selected_star_number = selected_star.id.split('_')[1];
    var i = 1;
    
    for(; i <= selected_star_number; i++) {
        $('star_' + i).className = 'star';
    }
    
    for(; i <= max_user_rating; i++) {
        $('star_' + i).className = 'stardim';
    }
}
  
function show_original_stars(original_user_rating, max_user_rating) {  
    var i = 1;
    
    for(; i <= original_user_rating; i++) {
        $('star_' + i).className = 'star';
    }
    
    for(; i <= max_user_rating; i++) {
        $('star_' + i).className = 'stardim';
    }
}

/* Begin General Functions */
function show_notification_msg(message) {
    var notfication_msg_box = jQuery('#notfication_msg_box');
    var message_ok_img = notfication_msg_box.children('img');
    notfication_msg_box.empty();
    notfication_msg_box.append(message_ok_img);
    notfication_msg_box.append(message);
    notfication_msg_box.show();
}
function show_error_msg(message) {
    var error_msg_box = jQuery('#error_message_box');
    var message_ok_img = error_msg_box.children('img');
    error_msg_box.empty();
    error_msg_box.append(message_ok_img);
    error_msg_box.append(message);
    error_msg_box.show();
}

function update_count(id, op) {
    var element = jQuery('#' + id);
    var element_text = element.html();
    var regex = /(\d+)/
    var new_count = 0;
    
    if(op == '+') {
        new_count = parseInt(element_text.match(regex)) + 1;
    }
    else {
        new_count = parseInt(element_text.match(regex)) - 1;
    }
    
    element.html(element_text.replace(regex, new_count));
}

function  share_to_public_sites(id, referer){
    new Ajax.Updater('hidden_content_to_navigate_to_share_job',
        '/job/share_to_public_sites_popup/'+id+'?referer='+referer, {
            asynchronous:true,
            evalScripts:true,
            onComplete:function(request){
                RedBox.addHiddenContent('hidden_content_to_navigate_to_share_job');
            },
            onLoading:function(request){
                RedBox.loading();
            }
        });
};
/* End General Functions */

/* Begin Onboarding Steps */
function mark_network_connected(network_name) {
    var social_box = jQuery('#' + network_name + '_social_box');
    var social_tick = jQuery('<div></div>');
    social_tick.attr('class', 'social-tick');
    social_box.prepend(social_tick);
      
    var network_connect_btn = jQuery('#' + network_name +'_connect_btn');
    network_connect_btn.removeClass('connect-btn');
    network_connect_btn.addClass('connected-btn');
}
/* End Onboarding Steps */

/* Begin Jobs */
function confirm_dashboard_task_delete(id) {
    TASK_ID = id;
    RedBox.showInline('dashboard_task_del_confirm_popup');
    return false;
}

function confirm_job_note_delete(id) {
    JOB_NOTE_ID = id;
    RedBox.showInline('job_note_del_confirm_popup');
    return false;
}

function confirm_job_delete(url) {
    HREF = url;
    RedBox.showInline('job_del_confirm_popup');
    return false;
}
/* End Jobs */

/* Begin Applicants */
function select_list_options(list_id, values) {
    var values_array = values.split(',');
    jQuery('#' + list_id).val(values_array);
}
  
jQuery("#as_jobs_select").change(function(){
    jQuery('div[id^="questionnaire_filter_"]').remove();
    jQuery('#questionnaire_filters_note').show();
    jQuery('#as_questionnaire_filter_count').val(0);
     
    put_questionnaire_filters_html_in_hf();
});
  
function init_questionnaire_date_filter(filter_number, date_format_to_display) {
    jQuery('#as_date_from_' + filter_number +', #as_date_to_' + filter_number).focus(function(){
        if(trim(jQuery(this).val()) == date_format_to_display) {
            jQuery(this).val('');
        }
    });
    
    jQuery('#as_date_from_' + filter_number +', #as_date_to_' + filter_number).blur(function(){
        if(trim(jQuery(this).val()) == '') {
            jQuery(this).val(date_format_to_display);
        }
    });
      
    jQuery('#as_date_from_' + filter_number +', #as_date_to_' + filter_number).removeClass('hasDatepicker');
      
    jQuery('#as_date_from_' + filter_number +', #as_date_to_' + filter_number).datepicker({
        inline: true,
        changeMonth: true,
        changeYear: true,
        onSelect: function(dateText, inst){
            on_date_select(dateText, inst);
        }
    });
}
  
function on_date_select(dateText, inst) {
    if(inst.id.indexOf('from') != -1) {
        jQuery('#' + inst.id.replace('from', 'to')).datepicker('option', 'minDate', dateText);
    }
    else {
        jQuery('#' + inst.id.replace('to', 'from')).datepicker('option', 'maxDate', dateText);
    }
}
  
function add_questionnaire_filter() {
    var as_job_id = jQuery('#as_jobs_select').val();
    
    if(as_job_id == -1) {
        RedBox.showInline('job_select_alert_popup');
    }
    else
    {
        jQuery.ajax({
            type: 'POST',
            url: '/app/add_questionnaire_filter',
            data: 'as_job_id=' + as_job_id + 
            '&as_questionnaire_filter_count=' + 
            (parseInt(jQuery('#as_questionnaire_filter_count').val()) + 1),
            beforeSend: function(){
                RedBox.loading();
            },
            success: function(html){
                RedBox.close();
                
                if(html != '') {
                    jQuery('#as_questionnaire_filter_count').val(
                        parseInt(jQuery('#as_questionnaire_filter_count').val()) + 1);
            
                    jQuery('#questionnaire_filters_note').hide();
            
                    var questionnaire_filter_div = jQuery('<div></div>');
                    jQuery(questionnaire_filter_div).attr('class', 'new-question-box');
                    jQuery(questionnaire_filter_div).attr('id', 
                        'questionnaire_filter_' + jQuery('#as_questionnaire_filter_count').val());
                    jQuery('#questionnaire_filters').append(questionnaire_filter_div);
            
                    jQuery(questionnaire_filter_div).html(html);
            
                    put_questionnaire_filters_html_in_hf();
                }
            }
        });
    }
}
  
function set_questionnaire_filter_type(as_questionnaire_filter_select) {
    var as_questionnaire_filter_select_tokens = 
    jQuery(as_questionnaire_filter_select).attr('id').split('_');
    var as_questionnaire_filter_count = 
    parseInt(as_questionnaire_filter_select_tokens[as_questionnaire_filter_select_tokens.length - 1]);
    
    var as_questionnaire_filter_type = 
    jQuery('#as_questionnaire_filter_type_' + as_questionnaire_filter_count);
  
    jQuery.ajax({
        type: 'POST',
        url: '/app/set_questionnaire_filter_type',
        data: 'as_question_id=' + 
        jQuery(as_questionnaire_filter_select).val() +
        '&as_questionnaire_filter_count=' +  as_questionnaire_filter_count,
        beforeSend: function(){
            RedBox.loading();
        },
        success: function(html){
            RedBox.close();
            jQuery(as_questionnaire_filter_type).html(html);
            put_questionnaire_filters_html_in_hf();
        }
    });
}
  
function delete_questionnaire_filter(filter_number) { 
    jQuery('#questionnaire_filter_' + filter_number).remove();
    
    if(jQuery('div[id^="questionnaire_filter_"]').length == 0) {
        jQuery('#questionnaire_filters_note').show();
    }
    
    put_questionnaire_filters_html_in_hf();
}
  
function put_questionnaire_filters_html_in_hf() {        
    jQuery('#questionnaire_filters_html').val(jQuery('#questionnaire_filters').html());
}

function toggle_app_list_tags_box() {
    jQuery('#advanced_search_box').hide();
    jQuery('#app_list_tags_box').slideToggle(); 
}

function clear_tags()
{
    jQuery('#tag_list_hf').val('');
    reload_page_with_new_params(0, 0, 0, 0, "");
}

function show_spinner_for_tags(message) {
    jQuery('#app_list_tags_box').html(
        '<div style=padding-top:30px;><span class=spinner>&nbsp;' + message + 
        '...</span></div>');
}

function toggle_tag_options() {
    jQuery('#tag_options').toggle();
}

function show_tags_in_cloud_view() {
    jQuery('#list_display_option').hide();
    jQuery('#cloud_display_option').show();
    jQuery('#tags_box').find('.clear').hide();
    createCookie('tag_list', '');
}

function show_tags_in_list_view() {
    jQuery('#cloud_display_option').hide();
    jQuery('#list_display_option').show();
    jQuery('#tags_box').find('.clear').show();
    createCookie('tag_list', '1');
}

function set_tag_style()
{
    var tag_list = jQuery('#tag_list_hf').val();

    if(tag_list != '')
    {
        var app_ids = tag_list.split(', ');
        i = 0;

        for(;i < app_ids.length;i++)
        {
            jQuery('#tag_'+app_ids[i]).attr('class', 'selected-tag');
        }
    }
}

function add_tag(tag_id)
{
    var tag_list =  jQuery('#tag_list_hf').val();

    if(tag_list.length == 0)
    {
        tag_list = tag_id;
    }
    else
    {
        tag_list = tag_list + ', ' + tag_id
    }

    jQuery('#tag_list_hf').val(tag_list);
    reload_page_with_new_params(0, 0, 0, 0, "");
}

function remove_tag(tag_id)
{
    var tag_list =  jQuery('#tag_list_hf').val();
    var temp = tag_list.split(', ');
    var temp_rs = '';

    for(var i = 0; i < temp.length;i++)
    {
        if(temp[i].trim() != tag_id.trim())
        {
            if(temp_rs != '')
            {
                temp_rs = temp_rs + ', ' + temp[i];
            }
            else
            {
                temp_rs = temp[i];
            }
        }
    }

    jQuery('#tag_list_hf').val(temp_rs);
    reload_page_with_new_params(0, 0, 0, 0, "");
}

function toggle_advanced_search_box() {
    jQuery('#app_list_tags_box').hide();
    jQuery('#advanced_search_box').slideToggle('slow');
}

function toggle_bulk_action_box() {
    if(getCheckedValue() == '') {
        jQuery('#bulk_Action_box').hide();
      
        jQuery('#filter_job').show();
        jQuery('#status_apps').show();
        jQuery('#app_list_filter_options').show();
        jQuery('.filter-tags').show();
    }
    else {
        jQuery('#filter_job').hide();
        jQuery('#status_apps').hide();
        jQuery('#app_list_filter_options').hide();
        jQuery('.filter-tags').hide();
      
        jQuery('#bulk_Action_box').show();
    }
}

function send_email() {
    vals = getCheckedValue();		
    			
    $('q').value=vals;
    $('email_form').action = "/app/bulk_mail" ;
    $('email_form').submit();
}

function share_app_in_bulk() {
    new Ajax.Updater('hidden_content_bulk_share_applications', '/app/bulk_share_applications', {
        asynchronous:true, 
        evalScripts:true, 
        onComplete:function(request){
            RedBox.addHiddenContent('hidden_content_bulk_share_applications');
        }, 
        onLoading:function(request){
            RedBox.loading();
        }
    });

    return false;
}

function mark_resume_as_read() {
    jQuery('#new_resume_icon').remove();
    
    jQuery.ajax({
        type: 'POST',
        url: '/app/mark_resume_as_read',
        data: 'id=' + jQuery('#app_id').val()
    });
}

function select_applicant_detail_tab(tab_id, evaluation_id, message_id) {
    jQuery('#app_detail_overview_tab_content').hide();
    jQuery('#app_detail_overview_tab').removeClass('inner-tab-active');
    
    jQuery('#app_detail_profile_tab_content').hide();
    jQuery('#app_detail_profile_tab').removeClass('inner-tab-active');

    jQuery('#app_detail_resume_tab_content').hide();
    jQuery('#app_detail_resume_tab').removeClass('inner-tab-active');

    jQuery('#app_detail_linkedin_tab_content').hide();
    jQuery('#app_detail_linkedin_tab').removeClass('inner-tab-active');
     
    jQuery('#app_detail_messages_tab_content').hide();
    jQuery('#app_detail_messages_tab').removeClass('inner-tab-active');
    
    jQuery('#app_detail_evaluations_tab_content').hide();
    jQuery('#app_detail_evaluations_tab').removeClass('inner-tab-active');
    
    jQuery('#app_detail_activity_tab_content').hide();
    jQuery('#app_detail_activity_tab').removeClass('inner-tab-active');

    jQuery('#app_detail_interviewer_tab_content').hide();
    jQuery('#app_detail_interviewer_tab').removeClass('inner-tab-active');
    
    if(tab_id == 0) {
        jQuery('#app_detail_overview_tab').addClass('inner-tab-active');
        jQuery('#app_detail_overview_tab_content').show();
    }
    else if(tab_id == 1) {
        jQuery('#app_detail_profile_tab').addClass('inner-tab-active');
        jQuery('#app_detail_profile_tab_content').show();
        mark_resume_as_read();
    }
    else if(tab_id == 2) {
        jQuery('#app_detail_resume_tab').addClass('inner-tab-active');
        jQuery('#app_detail_resume_tab_content').show();
    }
    else if(tab_id == 3) {
        jQuery('#app_detail_messages_tab').addClass('inner-tab-active');
        jQuery('#app_detail_messages_tab_content').show();
        
        if(message_id != null) {
            location.href = location.href.split('#')[0] + '#message_' + message_id;
        }
        
        jQuery.ajax({
            type: 'POST',
            url: '/app/mark_app_msgs_as_read',
            data: 'id=' + jQuery('#app_id').val()
        });
    }
    else if(tab_id == 4) {
        jQuery('#app_detail_evaluations_tab').addClass('inner-tab-active');
        jQuery('#app_detail_evaluations_tab_content').show();
        
        if(evaluation_id != null) {
            location.href = location.href.split('#')[0] + '#evaluation_' + evaluation_id;
        }
    }
    else if(tab_id == 5) {
        jQuery('#app_detail_activity_tab').addClass('inner-tab-active');
        jQuery('#app_detail_activity_tab_content').show();
    }
    else if(tab_id == 6) {
        jQuery('#app_detail_interviewer_tab').addClass('inner-tab-active');
        jQuery('#app_detail_interviewer_tab_content').show();
    }
}

function show_inline_change_status_box() {
    jQuery('#inline_change_status_box').show();
}

function hide_inline_change_status_box() {
    jQuery('#inline_change_status_box').hide();
}

function update_app_status_inline(id)
{    
    jQuery.ajax({
        type: 'POST',
        url: '/stage/update_status',
        data: 'id=' + id + '&new_stage=' + jQuery('#stage_id').val(),
        beforeSend: function(){
            jQuery('#inline_change_status_box').hide();
            jQuery('#status_updating_msg').show();
        },
        success: function(html){
            jQuery('#status_updating_msg').hide();
            
            if(html != "no")
            {
                jQuery('#current_status').html(jQuery('#stage_id option:selected').text());
            }
        }
    });
}

function get_mini_inbox_listing(id, loading_message) {
    jQuery.ajax({
        type: 'POST',
        url: '/app/inbox_listing',
        data: 'id=' + id + '&referer=app_overview_tab',
        beforeSend: function(){
            show_spinner_for_listing('mini_inbox_listing', loading_message);
        },
        success: function(html){
            jQuery('#mini_inbox_listing').html(html); 
        }
    });
}

function get_mini_file_listing(attachable_id, attachable_type, loading_message)
{
    jQuery.ajax({
        type: 'POST',
        url: '/app/mini_file_listing',
        data: 'attachable_id=' + attachable_id + '&attachable_type=' + attachable_type,
        beforeSend: function(){
            show_spinner_for_listing('mini_file_listing', loading_message);
        },
        success: function(html){
            jQuery('#mini_file_listing').html(html); 
        }
    });
}

function destroy_file(token, attachment_id, attachable_id, attachable_type, destroying_message) {
    jQuery.ajax({
        type: 'POST',
        url: '/app/destroy_file',
        data: 'token=' + token + '&attachable_type=' + attachable_type + '&attachable_id=' + attachable_id,
        beforeSend: function(){
            show_spinner_for_listing('file_' + attachment_id, destroying_message);
        },
        success: function(html){
            if(html == 'done') {
                jQuery('#file_' + attachment_id).slideUp('slow');
            }
            else{
                jQuery('#mini_file_listing').html(html); 
            }
        }
    });
}

function show_inline_app_tags_edit_box() {
    jQuery('#app_tags_list').hide();
    jQuery('#inline_app_tags_edit_box').show();
}

function hide_inline_app_tags_edit_box() {
    assigned_tags = jQuery.extend(true, [], saved_assigned_tags);
    assigned_tag_ids = jQuery.extend(true, [], saved_assigned_tag_ids);
    show_app_assigned_tags();
    refresh_available_tags();
    refresh_assigned_tags();
  
    jQuery('#inline_app_tags_edit_box').hide();
    jQuery('#app_tags_list').show();
}

function show_app_assigned_tags() {
    jQuery('#app_tags_list').empty();
    
    for(var i=0; i < assigned_tags.length; i++) {
        jQuery('#app_tags_list').html(jQuery('#app_tags_list').html() + 
            '<div class="tags-text-btn"><a class="selected-tag" href="/app/index?tag_list=' + 
            assigned_tag_ids[i] + '">' + assigned_tags[i] + '</a></div>');
    }
    
    if(assigned_tags.length == 0){
        jQuery('#app_tags_list').html('There are no tags assigned.');
    }
}


function is_tag_already_assigned(id) {
    var bl_ret = false;
    
    for(var i = 0; i < assigned_tag_ids.length; i++){
        if(assigned_tag_ids[i] == id){
            bl_ret = true;
        }
    }
    
    return bl_ret;
}

function refresh_available_tags() {
    jQuery('#available_tags').empty();
    
    for(var i = 0; i < available_tags.length; i++) {
        if(is_tag_already_assigned(available_tag_ids[i])) {
            jQuery('#available_tags').html(jQuery('#available_tags').html() + 
                '<div class="tags-text-btn"><a class="selected-tag" href="#" onclick="unassign_tag('+ available_tag_ids[i] +'); return false;">' + available_tags[i] + '</a></div>');
        }
        else {
            jQuery('#available_tags').html(jQuery('#available_tags').html() + 
                '<div class="tags-text-btn"><a href="#" onclick="assign_tag('+ available_tag_ids[i] +',\''+ escape(available_tags[i]) +'\'); return false;">' + available_tags[i] + '</a></div>');
        }
    }
}

function refresh_assigned_tags()  {
    jQuery('#new_assigned_tags_field').val("");
    
    for(var i=0; i < assigned_tags.length; i++) {
        jQuery('#new_assigned_tags_field').val(jQuery('#new_assigned_tags_field').val() + assigned_tags[i] + ' ');
    }
    
    for(var j=0; j < new_assigned_tags.length; j++) {
        jQuery('#new_assigned_tags_field').val(jQuery('#new_assigned_tags_field').val() + new_assigned_tags[j] + ' ');
    }
    
    jQuery('#hid_assigned').val(assigned_tag_ids.toString());
}

function search_for_available_tag() {
    temp_assigned_tags_id = new Array();
    temp_assigned_tags = new Array();
    temp_new_assigned_tags = new Array();
    str_tags = jQuery('#new_assigned_tags_field').val();
    tag_arr = str_tags.split(' ');
    
    for(var i = 0; i < tag_arr.length; i++) {
        found = false;
        
        for(var j = 0; j < available_tags.length; j++) {
            if(tag_arr[i] == available_tags[j]) {
                found = true;
                temp_index = j;
            }
        }
        
        if(found) {
            //It is an old item
            temp_assigned_tags_id.push(available_tag_ids[temp_index]);
            temp_assigned_tags.push(available_tags[temp_index]);
        }
        else {
            //Then it is a new item.
            //here we 'll make a suggestion to user
            temp_new_assigned_tags.push(tag_arr[i]);
        }
    }
    
    assigned_tag_ids = temp_assigned_tags_id;
    assigned_tags = temp_assigned_tags;
    new_assigned_tags = temp_new_assigned_tags;
    $('hid_assigned').value = assigned_tag_ids.toString();
    refresh_available_tags();
}

function assign_tag(id, text) {
    assigned_tags.push(unescape(text));
    assigned_tag_ids.push(id);
    refresh_available_tags();
    refresh_assigned_tags();
}

function unassign_tag(id) {
    for(var i = 0; i < assigned_tag_ids.length; i++) {
        if(assigned_tag_ids[i] == id){
            assigned_tags.splice(i,1);
            assigned_tag_ids.splice(i,1);
        }
    }
    
    refresh_available_tags();
    refresh_assigned_tags();
}

function save_assigned_tags(id, updating_message) {
    jQuery.ajax({
        type: 'POST',
        url: '/app/save_assigned_tags',
        data: 'id=' + id + '&assigned_tags=' + jQuery('#new_assigned_tags_field').val(),
        beforeSend: function(){
            jQuery('#app_show_tags').html('<div><span class="spinner">' + 
                updating_message + '...</div></span>');
        },
        success: function(html){
            jQuery('#app_show_tags').html(html);
        }
    });
}

function is_enter_key_pressed_on_tags_field(e, id, updating_message) {
    var keycode = e.which;
    
    if(keycode == 13){
        save_assigned_tags(id, updating_message);
        Event.stop(e);
    }
}

function show_spinner_for_listing(list_id, message) {
    jQuery('#' + list_id).html('<div style="padding: 8px 10px;">' + 
        '<span class="spinner">' + message + 
        '...</span></div>');
}

function get_task_listing(app_id, message)
{    
    jQuery.ajax({
        type: 'POST',
        url: '/task/mini_task_listing',
        data: 'app_id=' + app_id,
        beforeSend: function(){
            show_spinner_for_listing('task_list', message);
        },
        success: function(html){
            jQuery('#task_list').html(html); 
        }
    });           
}

function check_day_for_specific_date(){    
    if(jQuery('#day').val() == "5") {
        jQuery('#duedate_container').show();
    }
    else {
        jQuery('#duedate_container').hide();
    }
}

function mark_task_as_complete(id, app_id, referer, updating_message, succuss_message) {
    jQuery.ajax({
        type: 'POST',
        url: '/task/mark_as_complete',
        data: 'id=' + id + '&app_id=' + app_id + '&referer=' + referer,
        beforeSend: function(){
            show_spinner_for_listing(id + '_task', updating_message); 
        },
        success: function(html){
            jQuery('#task_list').html(html); 
            show_notification_msg(succuss_message);
        }
    });
}

function mark_task_as_incomplete(id, app_id, referer, updating_message, succuss_message) {
    jQuery.ajax({
        type: 'POST',
        url: '/task/mark_as_incomplete',
        data: 'id=' + id + '&app_id=' + app_id + '&referer=' + referer,
        beforeSend: function(){
            show_spinner_for_listing(id + '_task', updating_message); 
        },
        success: function(html){
            jQuery('#task_list').html(html); 
            show_notification_msg(succuss_message);
        }
    }); 
}

function save_task(action, id, app_id, referer, saving_message, success_message) {    
    jQuery.ajax({
        type: 'POST',
        url: '/task/' + action,
        data: 'id=' + id + '&app_id=' + app_id + '&referer=' + referer + '&' +
        '&filter=' + jQuery('#task-filter').val() + '&' + jQuery('form').serialize() +
        (jQuery('#tasks_page_id').length == 0 ? '' : '&tasks_page_id=' + jQuery('#tasks_page_id').val()),
        beforeSend: function() {
            RedBox.close();
            
            if(action == 'create') {                                
                show_spinner_for_listing('task_list',  saving_message);
            }
            else {
                show_spinner_for_listing(id+'_task' , saving_message);
            }
        },
        success: function(html) {
            jQuery('#task_list').html(html);
            show_notification_msg(success_message);
        }
    });
}

function destroy_task(id, destroying_message) {
    jQuery.ajax({
        type: 'POST',
        url: '/task/destroy',
        data: 'id=' + id + '&referer=app_overview_tab',
        beforeSend: function(){
            show_spinner_for_listing(id + '_task', destroying_message);
        },
        success: function(html){
            if(html == 'done') { 
                jQuery('#' + id + '_task').slideUp('slow');
            }
        }
    });
}

function get_mini_evaluation_listing(cand_id, loading_message) {
    jQuery.ajax({
        //   type: 'POST',
        url: '/evaluation_listing/' + cand_id,
        beforeSend: function(){
            show_spinner_for_listing('mini_evaluation_listing', loading_message);
        },
        success: function(html){
            jQuery('.evaluation_listing').html(html);
        }
    });
}


function get_mini_interview_listing(cand_id, loading_message) {
    // alert(cand_id);
    jQuery.ajax({
        //type: 'POST',
        url: '/interview_listing/' + cand_id,
        beforeSend: function(){
            show_spinner_for_listing('mini_interview_listing', loading_message);
        },
        success: function(html){
            jQuery('.interview_listing').html(html);
        }
    });
}



function get_mini_questionnaire_listing(id, loading_message) {
    jQuery.ajax({
        type: 'POST',
        url: '/app/mini_questionnaire_listing',
        data: 'id=' + id,
        beforeSend: function(){
            show_spinner_for_listing('mini_questionnaire_listing', loading_message);
        },
        success: function(html){
            jQuery('#mini_questionnaire_listing').html(html); 
        }
    });
}

function load_email_template(select_elmt_id, app_id)
{
    if(jQuery('#' + select_elmt_id)[0].selectedIndex == 0) {
        jQuery('#message_title').val('');
        jQuery('#message_new').val('');
        jQuery('#email_template_attachments_div').html('');
    }
    else {
        jQuery.ajax({
            type: 'POST',
            url: '/message/new_message_popup',
            data: 'email_template_id=' + jQuery('#' + select_elmt_id).val() +
            '&app_id=' + app_id,
            beforeSend: function(){
                jQuery('#et_loading_spinner').show();
            },
            success: function(html){
                jQuery('#et_loading_spinner').hide();
                jQuery('#RB_window').html(html);
            }
        });
    }
}

function remove_email_template_attachment(email_template_id)
{    
    jQuery('#email_template_attachment_div_' + email_template_id).remove();
}

function add_file_input_elmt()
{
    var file_inputs_count_hf = jQuery('#file_inputs_count_hf');
    file_inputs_count_hf.val(parseInt(file_inputs_count_hf.val()) + 1);

    var file_input_div = jQuery('<div></div>');
    file_input_div.attr('id', 'file_input_div_' + file_inputs_count_hf.val());

    var file_input_elmt = jQuery('<input />');
    file_input_elmt.attr('type', 'file');
    file_input_elmt.attr('id', 'attached_file_' + file_inputs_count_hf.val());
    file_input_elmt.attr('name', 'attached_file_' + file_inputs_count_hf.val());
    file_input_div.append(file_input_elmt);   

    var a_elmt =  jQuery('<a></a>');
    a_elmt.attr('href', 'javascript:void(0)');
    a_elmt.attr('class', 'remove-link');
    a_elmt.html('Remove');
    a_elmt.attr('id', file_inputs_count_hf.val());
    a_elmt.click(function(){
        remove_file_input_elmt(file_input_div.attr('id'));
    });
    file_input_div.append(a_elmt);

    jQuery('#file_inputs_div').append(file_input_div);
}

function remove_file_input_elmt(id)
{
    jQuery('#' + id).remove();
}

function toggle_quoted_text(quoted_text_toggle_link, message_id, 
    show_quoted_link_text, hide_quoted_link_text) {
    quoted_text_toggle_link = jQuery(quoted_text_toggle_link);
    var quoted_text_toggle_div = jQuery('#quoted_text_toggle_div_' + message_id);
    var quoted_text_div = jQuery('#quoted_text_div_' + message_id);
    
    if(quoted_text_div.css('display') == 'none') {
        quoted_text_toggle_link.html(hide_quoted_link_text);
        quoted_text_toggle_div.css('padding-bottom', '20px');
    }
    else {
        quoted_text_toggle_link.html(show_quoted_link_text);
        quoted_text_toggle_div.css('padding-bottom', '0px');
    }
    
    quoted_text_div.toggle();
}

function send_new_evaluation(app_id, success_message)
{
    if(jQuery('#evaluation_new_form').valid()) {       
        jQuery.ajax({
            type: 'POST',
            url: '/notes',
            data: 'id=' + app_id + 
            '&new_comment=' + encodeURIComponent(jQuery('#new_evaluation').val()),
            beforeSend: function(){
                RedBox.loading();
            },
            success: function(html){
                RedBox.close();
                show_notification_msg(success_message);
                jQuery('#app_detail_evaluations_tab_content').html(html); 
                update_count('app_detail_evals_tab_inner', '+');
            }
        });
    }
}

function update_evaluation(id)
{
    jQuery.ajax({
        type: 'PUT',
        url: '/notes/' + id,
        data: 'new_comment=' + encodeURIComponent(jQuery('#new_evaluation').val()) +
        '&referer=app_evaluations_tab',
        beforeSend: function(){
            RedBox.loading();
        },
        success: function(html){
            RedBox.close();
            jQuery('#app_detail_evaluations_tab_content').html(html); 
        }
    });
}

function destroy_evaluation(id, deleting_message)
{    
    jQuery.ajax({
        type: 'DELETE',
        url: '/notes/' + id,
        beforeSend: function() {
            RedBox.close();
            show_spinner_for_listing('evaluation_' + id, deleting_message);
        },
        success: function(html) {
            if(html == 'done') { 
                jQuery('#evaluation_' + id).slideUp('slow');
                update_count('app_detail_evals_tab_inner', '-');
            }
        }
    });
}

function request_evaluation_preview(id) {
    window.open('/app/request_evaluation_preview/' + id + '?' 
        + 'share_application[recipient_email]=' + jQuery('#share_application_recipient_email').val()
        + '&share_application[personal_notes]=' + encodeURI(jQuery('#share_application_personal_notes').val())
        + '&share_application[add_profile]=' + (jQuery('#share_application_add_profile').prop('checked') == true ? '1' : '0')
        + '&share_application[add_messages]=' + (jQuery('#share_application_add_messages').prop('checked') == true ? '1' : '0')
        + '&share_application[add_evaluations]=' + (jQuery('#share_application_add_evaluations').prop('checked') == true ? '1' : '0')
        ,'applicant_preview','width=650,height=770,resizable=yes,scrollbars=yes')
}

function delete_resume() {
    jQuery('#resume_msg').hide(); 
    jQuery('#attached_resume').show();
    jQuery('#delete_cv').val('1');
    
    return false;
}

function confirm_file_delete(attmnt_token, attmnt_id, attable_type, attable_id) {
    ATTACHMENT_TOKEN = attmnt_token;
    ATTACHMENT_ID = attmnt_id;
    ATTACHABLE_TYPE = attable_type;
    ATTACHABLE_ID = attable_id;
    RedBox.showInline('job_file_del_confirm_popup');
    return false;
}

function confirm_mini_list_task_delete(id) {
    TASK_ID = id;  
    RedBox.showInline('mini_task_del_confirm_popup');
    return false;
}

function confirm_evaluation_delete(id) {
    EVALUATION_ID = id;
    RedBox.showInline('evaluation_del_confirm_popup');
    return false;
}

function confirm_app_delete(url) {
    HREF = url;
    RedBox.showInline('app_del_confirm_popup');
    return false;
}
/* End Applicants */

/* Begin Tasks */
function confirm_tasks_tab_task_delete(id) {
    TASK_ID = id;
    RedBox.showInline('tasks_tab_del_confirm_popup');
    return false;
}
/* End Tasks */

/* Begin Account Settings */
function select_jobboard_settings_tab(tab_id) {
    if(tab_id == 1) {
        jQuery('#jb_set_tab_2').removeClass('hosted-selected-link');
        jQuery('#jb_set_tab_2_cont').hide();
        jQuery('#jb_set_tab_1').addClass('hosted-selected-link');
        jQuery('#jb_set_tab_1_cont').show();
    }
    else {
        jQuery('#jb_set_tab_1').removeClass('hosted-selected-link');
        jQuery('#jb_set_tab_1_cont').hide();
        jQuery('#jb_set_tab_2').addClass('hosted-selected-link');
        jQuery('#jb_set_tab_2_cont').show();
    }
}

function select_jobboard_general_hosted_tab(tab_id) {
    if(tab_id == 1) {
        jQuery('#jb_hosted_tab_lnk').removeClass('inner-tab-active');
        jQuery('#jb_hosted_tab').hide();
        jQuery('#jb_general_tab_lnk').addClass('inner-tab-active');
        jQuery('#jb_general_tab').show();
    }
    else {
        jQuery('#jb_general_tab_lnk').removeClass('inner-tab-active');
        jQuery('#jb_general_tab').hide();
        jQuery('#jb_hosted_tab_lnk').addClass('inner-tab-active');
        jQuery('#jb_hosted_tab').show();
    }
}

function confirm_user_status_change(url, message) {
    HREF = url;
    jQuery('.alrt-msg-text').html(message);
    RedBox.showInline('user_status_change_confirm_popup');
    return false;
}

function confirm_user_delete(url) {
    HREF = url;
    RedBox.showInline('user_del_confirm_popup');
    return false;
}

function confirm_location_delete(url) {
    HREF = url;
    RedBox.showInline('location_del_confirm_popup');
    return false;
}

function confirm_email_template_delete(url) {
    HREF = url;
    RedBox.showInline('email_template_del_confirm_popup');
    return false;
}

function confirm_department_delete(url) {
    HREF = url;
    RedBox.showInline('department_del_confirm_popup');
    return false;
}

function confirm_logo_delete(url) {
    HREF = url;
    RedBox.showInline('logo_del_confirm_popup');
    return false;
}

function confirm_account_plan_change(url, message) {
    HREF = url;
    jQuery('.alrt-msg-text').html(message);
    RedBox.showInline('account_plan_change_confirm_popup');
    return false;
}
/* End Account Settings */
