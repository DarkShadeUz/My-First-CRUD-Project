<?php


/**
 * CRUD class
 */
class _CRUD
{
	
	public $_db;

	public function load($action, $data=[])
	{
		switch ($action) {
			case 'create':
					self::create($data);
				break;
			case 'getForm':
					self::getForm($data);
				break;
			case 'update':
					self::update($data);
				break;
			case 'delete':
					self::delete($data);
				break;
			case 'view':
					self::view($data['id']);
				break;
			case 'refreshTable':
					self::refreshTable();
				break;
			case 'userModalButtons':
					self::refreshTable($data['id']);
				break;
			}
	}

	public function form($id = false) // comment
	{
		/*		if( $id != false ){
			$data = $this->_db->query("SELECT * FROM `users` WHERE `id` = '".$id."' LIMIT 1")->fetch_assoc();
		}
		return '
		<form id="forma" onsubmit="return false;">
				<div id="error" class="alert alert-danger fade in alert-dismissable" style="display:none;">
					<a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>
					<span></span>  
				</div>
				'.($id ? "<input type='number' id='id' value='".$id."' hidden>" : "" ).'
				<input type="text" class="form-control" id="first_name" id="first_name"'.($id==false ? "" : "value='".$data['first_name']."'" ).' required>
				<br>
				<input type="text" class="form-control" id="last_name" id="last_name"'.($id==false ? '' : "value='".$data['last_name']."'" ).' required >
				<br>
				<select class="form-control" id="sinf_id">';
				self::sinf_for_select($id==false ? "" : $data['sinf_id'] );
				echo '</select>
				<br>
			<button type="submit" onclick="'.($id==false ? "_create" : "_update").'('.$id.')" class="btn btn-success">Submit</button>
		</form>
		';*/
	}
		
	public function getForm($id = false)
	{
		$data = array();
		if( $id['id'] != false ){
			$data = $this->_db->query("SELECT * FROM `users` WHERE `id` = '".$id['id']."' LIMIT 1")->fetch_assoc();
		}
		$data['id'] = $id['id'];
		$data['option'] = self::sinf_for_select(false , "ajax");
			echo json_encode($data);
	}
		
	public function read() 
	{
		echo "
		<table id='read-table' class='table table-striped table-hover'>
			<thead class=''>
				<tr>
					<th class='text-center' width=40>
					№
					</th>
					<th>
					Ism
					</th>
					<th>
					Familya
					</th>
				</tr>
			</thead>
			<tbody>
			</tbody></table>";
	}
	
	public function сreateButton()
	{
		echo '
	    <div class="col-xs-8 col-lg-8"></div>
	    <div class=" text-center col-xs-4 col-lg-4">
	    	<div class="btn btn-success" data-toggle="modal" data-target="#modal" id="createButton">
	    		<span class="glyphicon glyphicon-plus"></span>
	    	</div>
	    </div>
	    ';
	}

	public function сreateModal()
	{
		echo '
		<div id="modal" class="modal fade" role="dialog">
		  <div class="modal-dialog">
		        <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        <h4 class="modal-title"></h4>
		      </div>
		      <div class="modal-body">
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Yopish</button>
		      </div>
		    </div>

		  </div>
		</div>
	    ';
	}
	
	
	public function create($data) // query
	{	
		if ( empty($data['first_name']) || empty($data['last_name']) || empty($data['sinf_id']) ) {
			echo "error";
			print_r($data);
		} else {
			$this->_db->query("INSERT INTO `users` SET `first_name` = '".mysqli_escape_string($this->_db, $data['first_name'])."',`last_name` = '".mysqli_escape_string($this->_db, $data['last_name'])."',`sinf_id` = '".$data['sinf_id']."' ");
			echo "success";
		}
	}

	public function update($data) // query
	{
		if ( empty($data['id']) || empty($data['first_name']) || empty($data['last_name']) || empty($data['sinf_id']) ) {
			echo "error";
		} else {
			echo "success";
			$this->_db->query("UPDATE `users` SET 
				`first_name` = '".mysqli_escape_string($this->_db, $data['first_name'])."',
				`last_name` = '".mysqli_escape_string($this->_db, $data['last_name'])."',
				`sinf_id` = {$data['sinf_id']}
				WHERE ( `id` = '".$data['id']."' )");
		}
	}
	
	public function delete($data) // query
	{
		if ( empty($data['id']) ) {
			echo 'error';
		} else {
			$this->_db->query("DELETE FROM `users` WHERE ( `id` = '".$data['id']."' ) LIMIT 1");
			echo 'success';
		}
	}
	
	public function view($id) // query
	{	
		$query = $this->_db->query("SELECT `u`.`id`, `u`.`first_name`, `u`.`last_name`, `u`.`created`, `s`.`name` as `sinf_name` FROM `users` as `u` INNER JOIN `sinf` as `s` ON `u`.`sinf_id` = `s`.`id` and `u`.`id` = '".$id."' ");
		$q = $query->fetch_assoc();
		$q['created'] = date("d.m.Y H:i", strtotime($q['created']));
		echo json_encode($q);
	}

	public function userModalButtons($id)
	{	
		return '
		<span id="updateButton" data-id="'.$id.'" class="btn btn-sm btn-info glyphicon glyphicon-edit" data-toggle="modal" data-target="#modal"></span>
		<span id="viewButton" data-id="'.$id.'" class="btn btn-sm btn-info glyphicon glyphicon-eye-open" data-toggle="modal" data-target="#modal"></span>
		<span id="deleteButton" data-id="'.$id.'" class="btn btn-sm btn-info glyphicon glyphicon-remove-circle" data-toggle="modal" data-target="#modal"></span>';
	}
	public function refreshTable()
	{	
		$query = $this->_db->query("SELECT `id`,`first_name`,`last_name` FROM `users`");
		$result = array();
		$i = 0;
		while ($q = $query->fetch_array()){
			$result[]= $q;
			$result[$i][3]= self::userModalButtons($q['id']);
			$i++;
		}
		$result['_row'] = $i;
		$result['_col'] = 3;
		echo json_encode($result);
	}

	public function sinf_for_select($id=false, $type=false)
	{
		$query = $this->_db->query("SELECT * FROM `sinf`");
		if ($type=="ajax") {
			$result = array();
			while( $q = $query->fetch_assoc() ){
				$result[]= array(
					'id' => $q['id'],
					'name' => $q['name'],
				);
			}
			return $result;
		} else {
			$result = "";
			while( $q = $query->fetch_assoc() ){
				$result.= "<option value='".$q['id']."'".($id!=false && $id == $q['id']  ? " selected":"" ).">".$q['name']."</option>";
			}

		}
		return $result;
	}

}











?>