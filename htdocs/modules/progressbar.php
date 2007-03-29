<?php

$progress = array();
$progress['total']      = 10000;
$progress['success']    = rand(round($progress['total'] / 10), round($progress['total'] - $progress['total'] / 10));
$progress['notrespond'] = rand(0, min(round($progress['total'] / 20), $progress['total'] - $progress['success']));
$progress['errors']     = rand(0, min(round($progress['total'] / 20), $progress['total'] - $progress['success'] - $progress['notrespond']));
$progress['complete']   = $progress['success'] + $progress['notrespond'] + $progress['errors'];
$progress['delay']      = rand(1000, 2000);

if ($progress['complete'] % 10 == 0) while (true) {}

$lastModified = new DateTime();
$expires = clone $lastModified;
$expires->modify('-1 year');

header("Expires: " . $expires->format(DateTime::RFC1123));
header("Last-Modified: " . $lastModified->format(DateTime::RFC1123));
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-type: text/javascript; charset=utf-8");

echo json_encode($progress);

?>