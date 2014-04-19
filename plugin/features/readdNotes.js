_OKCP.readdNotes = function(){
    if ($('#note_string').text() === '') {
		$('#actions .action_options').append('<button class="flatbutton white UI-change-btn" onclick="Profile.loadWindow(\'edit_notes\', 244); return false;">Add Note</button>');
    }
};