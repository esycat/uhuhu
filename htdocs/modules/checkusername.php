<?php

$usernames = array();
$usernames[] = 'esycat';

exit((string) (int) !in_array($_REQUEST['user_login'], $usernames));

?>