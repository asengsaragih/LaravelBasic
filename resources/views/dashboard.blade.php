<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Monitoring Banjir - Dashboard</title>

    <!-- Custom fonts for this template-->
    <link href="{{url('vendor/fontawesome-free/css/all.min.css')}}" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="{{url('css/sb-admin-2.min.css')}}" rel="stylesheet">
    <link href="{{url('vendor/datatables/dataTables.bootstrap4.min.css')}}" rel="stylesheet">

    <style>
        .select-dashboard {
            width: 50%;
            border: none;
            border: 2px solid #93CFF2;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            color: gray;
        }
    </style>




    <!-- Firebase -->
    <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-database.js"></script>

    <script src="{{url('js/firebase.js')}}"></script>
    <script src="{{url('js/sessionIndex.js')}}"></script>

</head>

<body id="page-top">

<script>setFirstOpenDashboard()</script>

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
                    <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                    <select class="select-dashboard" id="marker-dashboard" onchange="dashboardChangeData()">
                    </select>
                    <script>getMarkerDataDashboard()</script>
                </div>

                <!-- Content Row -->
                <!-- haru buat row untuk setiap tampilan -->
                <!-- end row -->

                <div class="row" id="card-dashboard">
                    <div class="col-xl-6 col-md-6 mb-4">
                        <div class="card border-left-warning shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Status Kit</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="recentDevice1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-6 col-md-6 mb-4">
                        <div class="card border-left-warning shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Data Terbesar Kit</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800" id="iot2Biggest"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{--    area chart            --}}
                <div class="row" id="chart-dashboard">
                    <div class="col-xl-12">
                        <!-- Area Chart -->
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Grafik Kit</h6>
                            </div>
                            <div class="card-body">
                                <div class="chart-area">
                                    <canvas id="IOT1Chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Data 1 -->
                <div class="card shadow mb-4" id="table-dashboard">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Data Kit</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered dataIOT1" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Debit</th>
                                        <th>Level</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>No</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Debit</th>
                                        <th>Level</th>
                                        <th>Category</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

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

<!-- Datatables custom -->


</body>

</html>
