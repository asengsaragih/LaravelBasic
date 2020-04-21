<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Monitoring Banjir - IOT</title>

    <!-- Custom fonts for this template-->
    <link href="{{url('vendor/fontawesome-free/css/all.min.css')}}" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="{{url('css/sb-admin-2.min.css')}}" rel="stylesheet">
    <link href="{{url('css/main.css')}}" rel="stylesheet" type="text/css">
    <link href="{{url('vendor/datatables/dataTables.bootstrap4.min.css')}}" rel="stylesheet">


    <!-- Firebase -->
    <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-database.js"></script>

    <script src="{{url('js/firebase.js')}}"></script>
    <script src="{{url('js/sessionIndex.js')}}"></script>

</head>

<body id="page-top">

<!-- Page Wrapper -->
<div id="wrapper">

    <!-- Sidebar -->
@include("layouts.nav-side")
<!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

        <!-- Main Content -->
        <div id="content">

            <!-- Topbar -->
        @include("layouts.nav-top")
        <!-- End of Topbar -->

            <!-- Begin Page Content -->
            <div class="container-fluid">

                <!-- Page Heading -->
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">IOT</h1>
                    <button id="toogle-new-marker" class="bg-gradient-primary d-none d-sm-inline-block btn btn-sm btn-primary" style="border: none" onclick="openModal()"><i class="fa fa-plus fa-sm text-white-50"></i> Adding Marker</button>
                </div>

                <!-- Content Row -->
                <!-- haru buat row untuk setiap tampilan -->
                <!-- end row -->

                <script>
                    function openModal() {
                        var x = document.getElementById("form-add-new-marker");
                        if (x.style.display === "none") {
                            x.style.display = "block";
                        } else {
                            x.style.display = "none";
                        }
                    }
                </script>

                <!-- Basic Card Example -->
                <div class="card shadow mb-4" id="form-add-new-marker" style="display: none">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Add New Marker</h6>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <h6>Location Name : </h6>
                            <input type="text" id="marker_name" class="form-control form-control-user" placeholder="eg. Bandung Barat">
                        </div>
                        <div class="form-group">
                            <h6>Latitude : </h6>
                            <input type="number" id="marker_latitude" class="form-control form-control-user" aria-describedby="emailHelp" placeholder="eg. -95.25015">
                        </div>
                        <div class="form-group">
                            <h6>Longitude : </h6>
                            <input type="number" id="marker_longitude" class="form-control form-control-user" placeholder="eg. 103.5862">
                        </div>
                        <div class="form-group">
                            <button type="submit" id="addNewMarker" class="btn btn-primary btn-user btn-block" onclick="createNewMarker()">Add New Marker</button>
                        </div>
                    </div>
                </div>

                <!-- Data 1 -->
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Device</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered deviceIOT" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Longitude</th>
                                    <th>Latitude</th>
                                    <th>Id Marker</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Longitude</th>
                                    <th>Latitude</th>
                                    <th>Id Marker</th>
                                    <th>Status</th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                <script>getAllMarkerData()</script>

            </div>
            <!-- /.container-fluid -->

        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
    @include("layouts.footer")
    <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

</div>
<!-- End of Page Wrapper -->

<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
</a>

<!-- Logout Modal-->
@include("layouts.modal-logout")
<!-- end of logout modal -->

<!-- Bootstrap core JavaScript-->
<script src="{{url('vendor/jquery/jquery.min.js')}}"></script>
<script src="{{url('vendor/bootstrap/js/bootstrap.bundle.min.js')}}"></script>

<!-- Core plugin JavaScript-->
<script src="{{url('vendor/jquery-easing/jquery.easing.min.js')}}"></script>

<!-- Custom scripts for all pages-->
<script src="{{url('js/sb-admin-2.min.js')}}"></script>

<!-- Page level plugins -->
<script src="{{url('vendor/chart.js/Chart.min.js')}}"></script>
<script src="{{url('vendor/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{url('vendor/datatables/dataTables.bootstrap4.min.js')}}"></script>

<!-- Page level custom scripts -->
<script src="{{url('js/demo/datatables-demo.js')}}"></script>
<script src="{{url('js/demo/chart-area-demo.js')}}"></script>
<script src="{{url('js/demo/chart-pie-demo.js')}}"></script>

</body>

</html>
