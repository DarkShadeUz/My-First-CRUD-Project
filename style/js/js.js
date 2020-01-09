

function _modalUpdate(_header, _body){
	$("#modal .modal-title").html(_header);
	$("#modal .modal-body").html(_body);
}

function _delete(id){
	$(document).ready(function(){
		$.ajax({
			url: "?action=delete",
			method: "post",
			data: {
				id: id
			},
			success: function(reponseTxt){
				if ( reponseTxt == "error" ) {
					$("#deleteEvent"+id+" #error span").html("Ma'lumot yuborishda xatolik");
					$("#deleteEvent"+id+" #error").slideDown(300);
					console.log(reponseTxt);
				} else {
					$("#deleteEvent"+id+" #error span").html("");
					$("#deleteEvent"+id+" #error").slideUp(300);
					$("#modal").modal("hide");
					_readTableRefresh();
				}
			}, 
			error: function(reponseTxt){
				console.log(reponseTxt);
			}
		});
	});
}

function _create(id){
	$(document).ready(function(){
		if( $("form #first_name").val() == "" || $("form #last_name").val() == "" ) {
			$("form #error span").html("Barcha joylarni to'diring");
			$("form #error").slideDown(300);
		} else {
			$("form #error span").html("");
			$("form #error").slideUp(300);
			$.ajax({
				url: "?action=create",
				method: "post",
				data: {
					first_name: $("form #first_name").val(),
					last_name: $("form #last_name").val(),
					sinf_id: $("form #sinf_id").val(),
				},
				success: function(reponseTxt){
					if ( reponseTxt == "error" ) {
						$("form #error span").html("Ma'lumot yuborishda xatolik");
						$("form #error").slideDown(300);
					} else {
						$("form #error span").html("");
						$("form #error").slideUp(300);
						$("form #first_name").val("");
						$("form #last_name").val("");
					$("#modal").modal("hide");

						_readTableRefresh();
					}
				}, 
				error: function(reponseTxt){
					console.log(reponseTxt);
				}
			});

		}
	});
}

function _update(id){
	$(document).ready(function(){
		if ( $("form #first_name").val() == "" || $("form #last_name").val() == "" ) {
			$("form #error span").html("Barcha joylarni to'diring");
			$("form #error").slideDown(300);
		} else {
			$("form #error span").html("");
			$("form #error").slideUp(300);
			$.ajax({
				url: "?action=update",
				method: "post",
				data: {
					id: id,
					first_name: $("form #first_name").val(),
					last_name: $("form #last_name").val(),
					sinf_id: $("form #sinf_id").val(),
				},
				success: function(reponse){
					if ( reponse == "error" ) {
						$("form #error span").html("Ma'lumot yuborishda xatolik");
						$("form #error").slideDown(300);
					} else {
						$("form #error span").html("");
						$("form #error").slideUp(300);
						$("form#updateEvent"+id+"").hide(100);
					$("#modal").modal("hide");

						_readTableRefresh();
					}
				}, 
				error: function(reponse){
					console.log(reponse);
				}
			});
		}
	});
}

function _readTableRefresh(){
	$(document).ready(function(){
		$.ajax({
			url: "?action=refreshTable",
			type: "post",
			dataType: "json",
			success: function(reponseTxt){
				var r = reponseTxt;
				var table = "";
				for(var i=0;i<r._row;i++){
					table+= "<tr>";
					for(var j=0;j<4;j++){
						if(j==0) {
							table+= "<td class='text-center'>";
							table+=(i+1);
							table+= "</td>";
						} else if(j==3) {
							table+= '<td width=180 class="text-center">';
							table+= r[i][j]; 
							table+= "</td>";
						} else {
							table+= "<td>";
							table+= r[i][j]; 
							table+= "</td>";
						}
					}
					table+= "</tr>";
				}
				$('#read-table tbody').html(table);
			}
		});
	});
}
_readTableRefresh();

$(document).on("click", "#createButton", function(){
	$.ajax({
		url: "?action=getForm",
		dataType: "json",
		success: function(reponse){
			var data = "";
			data+= '<form id="forma" onsubmit="return false;">';
			data+= '<div id="error" class="alert alert-danger fade in alert-dismissable" style="display:none;">';
			data+= '<a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>';
			data+= '<span></span>  ';
			data+= '</div>';
			data+= ''+(reponse.id ? "<input type='number' id='id' value='"+reponse.id+"' hidden>" : "" )+'';
			data+= '<input type="text" class="form-control" id="first_name" id="first_name"'+(!reponse.id ? "" : ' value="'+reponse.first_name+'"' )+' required>';
			data+= '<br>';
			data+= '<input type="text" class="form-control" id="last_name" id="last_name"'+(!reponse.id ? '' : "value='"+reponse.last_name+"'" )+' required >';
			data+= '<br>';
			data+= '<select class="form-control" id="sinf_id">';
			for (var i = 0; i < reponse.option.length; i++) {
				reponse.option[i].id;
				data+= "<option value='"+reponse.option[i].id+"'"+(reponse.option[i].id && reponse.option[i].id == reponse.id  ? " selected":"" )+">"+reponse.option[i].name+"</option>";
			}
			data+= '</select>';
			data+= '<br>';
			data+= '<button type="submit" onclick="'+(!reponse.id ? "_create" : "_update")+'('+reponse.id+')" class="btn btn-success">Submit</button>';
			data+= '</form>';
			_modalUpdate("CREATE", data);
		},
	})
});

$(document).on("click", "#updateButton", function(){
	$.ajax({
		url: "?action=getForm",
		data: {
			id: $(this).attr("data-id")
		},
		type: 'post',
		dataType: 'json',
		success: function(reponse){
			var data = "";
			data+= '<form id="forma" onsubmit="return false;">';
			data+= '<div id="error" class="alert alert-danger fade in alert-dismissable" style="display:none;">';
			data+= '<a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>';
			data+= '<span></span>  ';
			data+= '</div>';
			data+= ''+(reponse.id ? "<input type='number' id='id' value='"+reponse.id+"' hidden>" : "" )+'';
			data+= '<input type="text" class="form-control" id="first_name" id="first_name"'+(!reponse.id ? "" : ' value="'+reponse.first_name+'"' )+' required>';
			data+= '<br>';
			data+= '<input type="text" class="form-control" id="last_name" id="last_name"'+(!reponse.id ? '' : "value='"+reponse.last_name+"'" )+' required >';
			data+= '<br>';
			data+= '<select class="form-control" id="sinf_id">';
			for (var i = 0; i < reponse.option.length; i++) {
				reponse.option[i].id;
				data+= "<option value='"+reponse.option[i].id+"'"+(reponse.option[i].id && reponse.option[i].id == reponse.id  ? " selected":"" )+">"+reponse.option[i].name+"</option>";
			}
			data+= '</select>';
			data+= '<br>';
			data+= '<button type="submit" onclick="'+(!reponse.id ? "_create" : "_update")+'('+reponse.id+')" class="btn btn-success">Submit</button>';
			data+= '</form>';
			_modalUpdate("UpDaTe", data);
		},
	})
});

$(document).on("click", "#viewButton", function(){
	$.ajax({
		url: "?action=view",
		data: {
			id: $(this).attr("data-id")
		},
		type: 'post',
		dataType: 'json',
		success: function(reponse){
			var data = "";
			data+="<table class='table table-striped table-hover'>"
			data+="<tr>"
			data+="<th width=60>ID</th>"
			data+="<th width=60>"+reponse['id']+"</th>"
			data+="</tr>"
			data+="<tr>"
			data+="<th>Ism</th>"
			data+="<th>"+reponse['first_name']+"</th>"
			data+="</tr>"
			data+="<tr>"
			data+="<th>Familya</th>"
			data+="<th>"+reponse['last_name']+"</th>"
			data+="</tr>"
			data+="<tr>"
			data+="<th>Sinf Name</th>"
			data+="<th>"+reponse['created']+"</th>"
			data+="</tr>"
			data+="<tr>"
			data+="<th>Sinf Name</th>"
			data+="<th>"+reponse['sinf_name']+"</th>"
			data+="</tr>"
			data+="</table>"
			_modalUpdate("VieW", data);
		},
	})
});

$(document).on("click", "#deleteButton", function(){
	var data = "";
	data+= '<div id="error" class="alert alert-danger fade in alert-dismissable" style="display:none;">';
	data+= '<a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>';
	data+= '<span></span>  ';
	data+= '</div>';
	data+= 'Siz rostdan shu ma\'lumotni o\'chirmoqchimisiz?<br>';
	data+= '<span onclick="_delete('+$(this).attr("data-id")+');" class="btn btn-lg btn-success" data-dismiss="modal">Ha</span>';
	data+= '<span class="btn btn-md btn-danger" data-dismiss="modal">Yo\'q</span>';
	data+= '</div>';
	_modalUpdate("DelETe", data);
});
