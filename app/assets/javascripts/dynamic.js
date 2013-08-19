/*-----------------------------------
	Global Variables
------------------------------------*/
var total_id=0;
var editor_save=0;
var question_id=0;
var qdetail_id = new Array();
function show_field(show_editor){
    show_editor = (show_editor == 'undefined' ? true : show_editor)

    if(editor_save == 0 && show_editor){
        tinyMCE.triggerSave();
        editor_save=1;
    }
    unselected();
    if(total_id == 0){
        //Add a control if there is none
        addControl('textinput');
    }else{
        //for total_id > 0 select first question
        selectField(1);
    }
}

function show_newfield(){
    toggleDisplay('shownewfields', 'block');
}
function add_newfield(){
    unselected();
    addControl('textinput');
}
function toggleDisplay(element, visible) {
    $(element).style.display = visible;
}
function addControl(type){
    question_id=++total_id;
    show_newfield();
    createControl();
    if (type=='select' || type=='radiobutton' || type=='checkbox'){
        createHiddenControls();
    }
    createData(type, 0);
    updateValues();
    initDragDrop();
    selectField(question_id);
}
function duplicateControl(){
    unselected();
    old_question_id = question_id;
    type = $('hid_type_'+question_id).value;
    question_id = ++total_id;
    createControl();
    if (type=='select' || type=='radiobutton' || type=='checkbox'){
        duplicateHiddenControls(old_question_id);
    }
    createData(type, old_question_id);
    updateValues();
    initDragDrop();
    selectField(question_id);
}
function removeControl(){
    if ( ( $('hid_type_'+question_id).value=='select' || $('hid_type_'+question_id).value=='radiobutton'
        || $('hid_type_'+question_id).value=='checkbox' ) ){
        removeHiddenControls();
    }
    Element.remove($('question_'+question_id));
    $('q_position').innerHTML = $('q_position').innerHTML.replace(','+question_id+',', ',');
    $('question_ids').value = $('q_position').innerHTML;
    if ($('question_ids').value==','){
        Element.hide("frm_question");
        Element.hide("shownewfields");
        Element.hide('job-questionnaire');
        Element.show("question_intro");
        total_id = 0;
    }else{
        selectField($('q_position').innerHTML.substr(1, $('q_position').innerHTML.length-2).split(',')[0]);
    }
    $('q_desc').removeClassName("fieldRed");
}
function changeControlType(type){
    if ( ( $('hid_type_'+question_id).value=='select' || $('hid_type_'+question_id).value=='radiobutton'
        || $('hid_type_'+question_id).value=='checkbox' ) && ( type=='textinput' || type=='textarea' || type=='date' || type=='fileinput') ){
        removeHiddenControls();
    }
    if ( ( $('hid_type_'+question_id).value=='textinput' || $('hid_type_'+question_id).value=='textarea' || $('hid_type_'+question_id).value=='fileinput'
        || $('hid_type_'+question_id).value=='date' ) && ( type=='select' || type=='radiobutton' || type=='checkbox' ) ){
        createHiddenControls();
    }
    $('control_'+question_id).innerHTML = drawControls[type]();
    $('hid_type_'+question_id).value = type;
    selectField(question_id);
}
function createControl(){
    var new_li = document.createElement('li');
    new_li.setAttribute('id','question_'+question_id);
    $('formFields').appendChild(new_li);
}
function createData(type, old_question_id){
    if (old_question_id>0){
        desc = $('hid_desc_'+old_question_id).value;
        inst = $('hid_inst_'+old_question_id).value;
        vali = $('hid_vali_'+old_question_id).value;
    }else{
        desc = 'Untitled';
        inst = '';
        vali = 'notrequired';
    }
    str = '<div class="arrow"></div>';
    str += '<a class="hvr" onmouseup="JavaScript:updateField('+question_id+');" onclick="JavaScript:validate_question_desc_before_select_field('+question_id+')" title="Click to edit. Drag to reorder.">'+
    '<div><label class="desc" id="desc_'+question_id+'">'+desc+'<span id="vali_'+question_id+'" class="mandatory_signs"';
    str += (old_question_id>0 && vali=='required') ? 'style="display:inline"' : '';
    str += '>&nbsp;</span></label><br/></div><div class="clear"></div>';
    str += '<div id="control_'+question_id+'">' + drawControls[type]() + '</div>';
    str += '<p id="inst_'+question_id+'" class="light">'+inst+'</p>';
    str += '</a>';
    str += '<input type="hidden" name="hid_desc_'+question_id+'" id="hid_desc_'+question_id+'" value="'+desc+'">'+
    '<input type="hidden" name="hid_type_'+question_id+'" id="hid_type_'+question_id+'" value="'+type+'">'+
    '<input type="hidden" name="hid_inst_'+question_id+'" id="hid_inst_'+question_id+'" value="'+inst+'">'+
    '<input type="hidden" name="hid_vali_'+question_id+'" id="hid_vali_'+question_id+'" value="'+vali+'">';
    //str += fieldAction();
    $('question_'+question_id).innerHTML = str;
}
function fieldAction(){
    return ''+
    '<div class="fieldActions">'+
    '<img src="/images/dy_add.gif" alt="Duplicate" title="Duplicate" onmousedown="duplicateControl('+question_id+')">&nbsp;'+
    '<img src="/images/dy_delete.gif" alt="Delete" title="Delete" onmousedown="removeControl()">'+
    '</div>';
}
function updateValues(){
    $('q_position').innerHTML += question_id+',';
    $('question_ids').value = $('q_position').innerHTML;
}
function initDragDrop() {
    Sortable.create("formFields", {
        onUpdate:function(){
            new Ajax.Updater('q_position', '/job/order', {
                asynchronous:true,
                evalScripts:true,
                onComplete:function(request){
                    completeDragDrop();
                },
                parameters:Sortable.serialize("formFields")
            })
        }
    })
}
function completeDragDrop(){
    $('question_ids').value = $('q_position').innerHTML;
}
function createHiddenControl(qd_id){
    var new_ctrl = document.createElement('input');
    new_ctrl.type = 'hidden';
    new_ctrl.id = 'hid_qd_'+question_id+'_'+qd_id;
    new_ctrl.name = 'hid_qd_'+question_id+'_'+qd_id;
    new_ctrl.value = '';
    $('formFields').appendChild(new_ctrl);
}
function duplicateHiddenControls(old_question_id){
    varChoices = $('hid_qd_'+old_question_id+'_total').value.substr(1, $('hid_qd_'+old_question_id+'_total').value.length-2).split(',');
    for (i=0; i<varChoices.length; i++){
        var new_ctrl = document.createElement('input');
        new_ctrl.type = 'hidden';
        new_ctrl.id = 'hid_qd_'+question_id+'_'+varChoices[i];
        new_ctrl.name = 'hid_qd_'+question_id+'_'+varChoices[i];
        new_ctrl.value = $('hid_qd_'+old_question_id+'_'+varChoices[i]).value;
        $('formFields').appendChild(new_ctrl);
        qdetail_id[question_id] = parseInt(varChoices[i]);
    }
    var new_ctrl = document.createElement('input');
    new_ctrl.type = 'hidden';
    new_ctrl.id = 'hid_qd_'+question_id+'_total';
    new_ctrl.name = 'hid_qd_'+question_id+'_total';
    new_ctrl.value = $('hid_qd_'+old_question_id+'_total').value;
    $('formFields').appendChild(new_ctrl);
    var new_ctrl = document.createElement('input');
    new_ctrl.type = 'hidden';
    new_ctrl.id = 'hid_qd_'+question_id+'_default';
    new_ctrl.name = 'hid_qd_'+question_id+'_default';
    new_ctrl.value = $('hid_qd_'+old_question_id+'_default').value;
    $('formFields').appendChild(new_ctrl);
}
function createHiddenControls(){
    var new_ctrl = document.createElement('input');
    new_ctrl.type = 'hidden';
    new_ctrl.id = 'hid_qd_'+question_id+'_1';
    new_ctrl.name = 'hid_qd_'+question_id+'_1';
    new_ctrl.value = 'First choice';
    $('formFields').appendChild(new_ctrl);
    var new_ctrl = document.createElement('input');
    new_ctrl.type = 'hidden';
    new_ctrl.id = 'hid_qd_'+question_id+'_2';
    new_ctrl.name = 'hid_qd_'+question_id+'_2';
    new_ctrl.value = 'Second choice';
    $('formFields').appendChild(new_ctrl);
    var new_ctrl = document.createElement('input');
    new_ctrl.type = 'hidden';
    new_ctrl.id = 'hid_qd_'+question_id+'_3';
    new_ctrl.name = 'hid_qd_'+question_id+'_3';
    new_ctrl.value = 'Third choice';
    $('formFields').appendChild(new_ctrl);
    var new_ctrl = document.createElement('input');
    new_ctrl.type = 'hidden';
    new_ctrl.id = 'hid_qd_'+question_id+'_total';
    new_ctrl.name = 'hid_qd_'+question_id+'_total';
    new_ctrl.value = ',1,2,3,';
    $('formFields').appendChild(new_ctrl);
    var new_ctrl = document.createElement('input');
    new_ctrl.type = 'hidden';
    new_ctrl.id = 'hid_qd_'+question_id+'_default';
    new_ctrl.name = 'hid_qd_'+question_id+'_default';
    new_ctrl.value = '';
    $('formFields').appendChild(new_ctrl);
    qdetail_id[question_id] = 3;
}
function removeHiddenControls(){
    varChoices = $('hid_qd_'+question_id+'_total').value.substr(1, $('hid_qd_'+question_id+'_total').value.length-2).split(',');
    for (i=0; i<varChoices.length; i++){
        if($('hid_qd_'+question_id+'_'+varChoices[i]) != null)
            Element.remove($('hid_qd_'+question_id+'_'+varChoices[i]));
    }
    Element.remove($('hid_qd_'+question_id+'_total'));
    Element.remove($('hid_qd_'+question_id+'_default'));
}
function addChoice(qd_id){
    qdetail_id[question_id] = qdetail_id[question_id]+1;
    createHiddenControl(qdetail_id[question_id]);
    $('hid_qd_'+question_id+'_'+'total').value = $('hid_qd_'+question_id+'_'+'total').value.replace(','+qd_id+',', ','+qd_id+','+qdetail_id[question_id]+',');
    $('control_'+question_id).innerHTML = drawControls[$('hid_type_'+question_id).value]();
    selectField(question_id);
}
function removeChoice(qd_id){
    varChoices = $('hid_qd_'+question_id+'_total').value.substr(1, $('hid_qd_'+question_id+'_total').value.length-2).split(',');
    if (varChoices.length>1){
        Element.remove($('hid_qd_'+question_id+'_'+qd_id));
        $('hid_qd_'+question_id+'_'+'total').value = $('hid_qd_'+question_id+'_'+'total').value.replace(','+qd_id+',', ',');
        if ($('hid_qd_'+question_id+'_default').value == qd_id){
            $('hid_qd_'+question_id+'_default').value = '';
        }
        $('control_'+question_id).innerHTML = drawControls[$('hid_type_'+question_id).value]();
        selectField(question_id);
    }else{
        RedBox.showInline('one_option_req_alert_popup');
    }
}
function addPosition(){
    varValues = $('q_position').innerHTML.substr(1, $('q_position').innerHTML.length-2).split(',');
    for (i=0; i<varValues.length; i++){
        if (varValues[i]==question_id){
            break;
        }
    }
    $('fieldPos').innerHTML = i+1+'.';
}
/*-----------------------------------
          SELECT A FIELD
------------------------------------*/
// When the user clicks on a field, that field becomes the active field.
function selectField(id) {
    unselected();
    selected(id);
    show_newfield()
    showProperties(id);
    $('shownewfields').style.marginTop = $('question_'+id).offsetTop;
}
function updateField(id) {
    setTimeout('selectField('+id+')', 100);
}
function snapFieldProperties() {
    $('shownewfields').style.marginTop = $('question_'+question_id).offsetTop - 220 + 'px';
    addPosition();
}
function showProperties(id){
    $('q_desc').value = $('hid_desc_'+id).value;
    $('q_type').value = $('hid_type_'+id).value;
    $('q_inst').value = $('hid_inst_'+id).value;
    $('q_vali').checked = ($('hid_vali_'+id).value=='notrequired') ? false : true;
    if ($('hid_type_'+id).value=='radiobutton' || $('hid_type_'+id).value=='select' || $('hid_type_'+id).value=='checkbox'){
        toggleDisplay('listChoices', 'block');
        initChoices(id);
    }else{
        toggleDisplay('listChoices', 'none');
    }
}
function initChoices(id){
    varChoices = $('hid_qd_'+id+'_total').value.substr(1, $('hid_qd_'+id+'_total').value.length-2).split(',');
    str = '';
    for (i=0; i<varChoices.length; i++){
        str += '<li>'+
        '<input id="choices'+varChoices[i]+'" maxlength="150" autocomplete="off" value="'+$('hid_qd_'+id+'_'+varChoices[i]).value+'" onkeyup="updateProperties(this.value, \'choices\', '+varChoices[i]+')" type="text">'+
        '<span class="dy_add" title="Add" onclick="addChoice('+varChoices[i]+')">&nbsp;</span>'+
        '<span class="dy_delete" title="Delete" onclick="removeChoice('+varChoices[i]+')">&nbsp;</span>'+
        '<span class="';
        str += ($('hid_qd_'+question_id+'_default').value==varChoices[i]) ? 'star' : 'stardim';
        str += 		'" title="Make Default" id="qd_def_'+varChoices[i]+'" onclick="makeDefault('+varChoices[i]+')">&nbsp;</span>'+
        '</li>';
    }
    $('fieldChoices').innerHTML = str;
}
function unselected(){
    Element.removeClassName('question_'+question_id, 'editing');
}
function selected(id){
    Element.addClassName('question_'+id, 'editing');
    question_id = id;
}
/*-----------------------------------
	Drawing Controls
------------------------------------*/
drawControls = {
    fileinput: function() {
        return '<img src="/images/inputfile_image.jpg" />';
    },
    textinput: function() {
        return '<input type="text" readonly="readonly" class="input" />';
    },
    textarea: function() {
        return '<textarea readonly="readonly" class="textarea"></textarea>';
    },
    select: function() {
        str = '<select class="select" id="lbl_qd_'+question_id+'">'+
        '<option>--- Select ---</option>';
        varChoices = $('hid_qd_'+question_id+'_total').value.substr(1, $('hid_qd_'+question_id+'_total').value.length-2).split(',');
        for (i=0; i<varChoices.length; i++){
            str += '<option id="opt_qd_'+question_id+'_'+varChoices[i]+'"';
            if ($('hid_qd_'+question_id+'_default').value==varChoices[i]){
                str +='selected="selected"';
            }
            str += '>'+$('hid_qd_'+question_id+'_'+varChoices[i]).value+'</option>';
        }
        str += '</select>';
        return str;
    },
    radiobutton: function() {
        varChoices = $('hid_qd_'+question_id+'_total').value.substr(1, $('hid_qd_'+question_id+'_total').value.length-2).split(',');
        str = '';
        for (i=0; i<varChoices.length; i++){
            str += '<div class="choice"><input id="lbl_qd_'+question_id+'_'+varChoices[i]+'" name="group_'+question_id+'" type="radio"';
            if ($('hid_qd_'+question_id+'_default').value==varChoices[i]){
                str +='checked="checked"';
            }
            str += '><span id="opt_qd_'+question_id+'_'+varChoices[i]+'">';
            str += ($('hid_qd_'+question_id+'_'+varChoices[i]).value=='') ? '&nbsp;' : $('hid_qd_'+question_id+'_'+varChoices[i]).value;
            str += '</span></div>';
        }
        return str;
    },
    checkbox: function() {
        varChoices = $('hid_qd_'+question_id+'_total').value.substr(1, $('hid_qd_'+question_id+'_total').value.length-2).split(',');
        str = '';
        for (i=0; i<varChoices.length; i++){
            str += '<div class="choice"><input id="lbl_qd_'+question_id+'_'+varChoices[i]+'" type="checkbox"';
            if ($('hid_qd_'+question_id+'_default').value==varChoices[i]){
                str +='checked="checked"';
            }
            str += '><span id="opt_qd_'+question_id+'_'+varChoices[i]+'">';
            str += ($('hid_qd_'+question_id+'_'+varChoices[i]).value=='') ? '&nbsp;' : $('hid_qd_'+question_id+'_'+varChoices[i]).value;
            str += '</span></div>';
        }
        return str;
    },
    date: function() {
        return '<input type="text" readonly="readonly" class="input" value="mm/dd/yyyy" />';
    }
}
/*-----------------------------------
	Setting Values
------------------------------------*/
// If a property is changed, this change needs to be added to the JSON database, and the field display needs to be updated.
function updateProperties(value, place, pos) {
    (place!='choices') ? liveChanges[place](value) : liveChanges[place](value, pos);
}
function makeDefault(pos){
    if ($('hid_qd_'+question_id+'_default').value!='' || $('hid_qd_'+question_id+'_default').value==pos){
        $('qd_def_'+$('hid_qd_'+question_id+'_default').value).className = 'stardim';
        if ($('hid_qd_'+question_id+'_default').value!='' && ($('hid_type_'+question_id).value=='checkbox'||$('hid_type_'+question_id).value=='radiobutton')){
            $('lbl_qd_'+question_id+'_'+$('hid_qd_'+question_id+'_default').value).checked = false;
        }else if ($('hid_type_'+question_id).value=='select'){
            $('lbl_qd_'+question_id).selectedIndex=0;
        }
    }
    if ($('hid_qd_'+question_id+'_default').value=='' || $('hid_qd_'+question_id+'_default').value!=pos){
        $('qd_def_'+pos).className='star';
        if ($('hid_type_'+question_id).value=='checkbox' || $('hid_type_'+question_id).value=='radiobutton'){
            $('lbl_qd_'+question_id+'_'+pos).checked = true;
        }else if ($('hid_type_'+question_id).value=='select'){
            for (i=0; i<$('lbl_qd_'+question_id).length; i++){
                if ($('lbl_qd_'+question_id).options[i].text==$('choices'+pos).value){
                    break;
                }
            }
            $('lbl_qd_'+question_id).selectedIndex=i;
        }
    }
    $('hid_qd_'+question_id+'_default').value = ($('hid_qd_'+question_id+'_default').value==pos) ? '' : pos;
}
liveChanges = {
    // Update the display of the controls.
    job_title: function(value) {
        $('fname').innerHTML = $('job_title').innerHTML = ($('job_job_title').value=='') ? 'Untitled' : $('job_job_title').value;
    },
    job_loc: function(value) {
        $('job_loc').innerHTML = ($('job_location_id').options[$('job_location_id').selectedIndex].text=='---Select---') ? '' : $('job_location_id').options[$('job_location_id').selectedIndex].text;
    },
    job_sal: function(value) {
        $('job_sal').innerHTML = $('job_salary_range').value;
    },
    job_desc: function(value) {
        $('job_desc').innerHTML = $('job_description').value;
    },
    job_resume: function(value) {
        if (value){
            $('job_email_title').innerHTML = 'Resume required to apply for this job';
        //$('job_email_desc').innerHTML = 'Attach your resume and it needs to be in the .doc file format.<br />(Microsoft Word)';
        }else{
            $('job_email_title').innerHTML = 'Resume not required to apply for this job';
        //$('job_email_desc').innerHTML = '';
        }
    },
    job_resume_type: function(value) {
        if (value){
            $('job_email_desc').innerHTML = 'IMPORTANT! Your CV/Resume must be in Word (.doc) or PDF format';
        }else{
            $('job_email_desc').innerHTML = '';
        }
    },
    description: function(value) {
        mandatory_sign = '<span id="vali_' + question_id + '" class="mandatory_signs" style="display:' + $('vali_'+question_id).style.display + '">&nbsp;</span>'
        $('desc_'+question_id).innerHTML = value + mandatory_sign;
        $('hid_desc_'+question_id).value = value;
    },
    required: function(value){
        if (value){
            $('vali_'+question_id).style.display = 'inline';
            $('hid_vali_'+question_id).value = 'required';
        }else{
            $('vali_'+question_id).style.display = 'none';
            $('hid_vali_'+question_id).value = 'notrequired';
        }
    },
    inst: function(value) {
        $('inst_'+question_id).innerHTML = value;
        $('hid_inst_'+question_id).value = value;
    },
    choices: function(value, pos){
        var opt_qd = document.getElementById('opt_qd_'+question_id+'_'+pos);
        var hid_qd = document.getElementById('hid_qd_'+question_id+'_'+pos);

        if (trim(value) == '')
        {
            opt_qd.innerHTML = '';
            hid_qd.value = '';

            if(opt_qd.parentNode.className == 'choice') {
                opt_qd.parentNode.style.display = 'none';
            }
            else if(opt_qd.parentNode.className == 'select') {
                opt_qd.style.display = 'none';
            }
        }
        else
        {
            opt_qd.innerHTML = value;
            hid_qd.value = value;

            if(opt_qd.parentNode.className == 'choice') {
                opt_qd.parentNode.style.display = 'block';
            }
            else if(opt_qd.parentNode.className == 'select') {
                opt_qd.style.display = 'block';
            }
        }
    }
}
function check_form(){
//	$('question_ids').value = $('q_position').innerHTML;
}
function clear_form(){
    $('job_job_title').value = '';
    $('fname').innerHTML = $('job_title').innerHTML = 'Untitled';
    $('job_location_id').value = '';
    $('job_loc').innerHTML = '';
    $('job_salary_range').value = '';
    $('job_sal').innerHTML = '';
    $('job_description').value = '';
    $('job_desc').innerHTML = '';
    $('job_email_apply').checked = false;
    $('job_attach_cv').checked = false;
    $('job_email_title').innerHTML = 'Resume not Required to Apply for this job';
    $('job_email_desc').innerHTML = '';
    $('job_attach_doc').checked = false;
}
function publish_job(){
//$('job_status').value = "published";
//return true;
}

// To adjust MarginTop of job's questionnaire edit pane ; --start
var timerID = 0;
var offsetTopConstant = 0;

function AdjustQuestionEditPane(is_ie7, is_chrome)
{
        if(is_ie7 == 'true')
        {
            offsetTopConstant = 30;
        }
        else
        {
            offsetTopConstant = 33;
        }
    
    if($('shownewfields') && $('shownewfields').style.display != 'none'){
        $('shownewfields').style.marginTop = $('question_'+question_id).offsetTop - offsetTopConstant + 'px';
    }

    if(timerID)
    {
        clearTimeout(timerID);
    }

    timerID = setTimeout("AdjustQuestionEditPane('"+ is_ie7 +"', '"+ is_chrome +"')", 100);
}
// To adjust MarginTop of job's questionnaire edit pane ; --end

function validate_question_desc_presence(no_q_desc_message)
{
    if(validate_choices_presence())
    {
        if(trim($('q_desc').value) == "")
        {
            $('q_desc').className = "fieldRed";
            RedBox.showInline('no_q_desc_alert_popup');
            return false;
        }
        else
        {
            Element.hide('shownewfields');
            unselected();
            $('q_desc').removeClassName("fieldRed");
        }
    }
    
    return true;
}

function validate_question_desc_before_select_field(id)
{
    if(validate_choices_presence())
    {
        if(trim($('q_desc').value) == "")
        {
            removeControl();
            $('q_desc').removeClassName("fieldRed");
            selectField(id);
        }
        else
        {
            selectField(id);
        }
    }
}

function validate_choices_presence()
{
    is_question_chioces_valid = true;
    empty_fields_count = 0;

    if($('hid_qd_'+question_id+'_total'))
    {
        varChoices = $('hid_qd_'+question_id+'_total').value.substr(1, $('hid_qd_'+question_id+'_total').value.length-2).split(',');
        
        for (i=0; i<varChoices.length; i++){
            if($('hid_qd_'+question_id+'_'+varChoices[i]).value == ''){
                is_question_chioces_valid = false;
            }
            else {
                is_question_chioces_valid = true;
            }

            if(is_question_chioces_valid == false) {
                empty_fields_count += 1;
            }
        }
        
        if(empty_fields_count == varChoices.length)
        {
            RedBox.showInline('job_question_del_confirm_popup');                
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}

function delete_question_for_empty_choices() {
    removeControl();
                
    if($('hid_qd_'+question_id+'_total') != null) {
        Element.remove($('hid_qd_'+question_id+'_total'));
    }
                
    if($('hid_qd_'+question_id+'_default') != null) {
        Element.remove($('hid_qd_'+question_id+'_default'));
    }
}
