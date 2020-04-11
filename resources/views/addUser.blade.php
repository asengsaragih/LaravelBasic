<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Monitoring Banjir - Tambah Akun</title>

    <!-- Custom fonts for this template-->
    <link href="{{url('vendor/fontawesome-free/css/all.min.css')}}" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="{{url('css/sb-admin-2.min.css')}}" rel="stylesheet">

    <!-- Firebase -->
    <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.8.0/firebase-database.js"></script>
    <script src="{{url('js/firebase.js')}}"></script>
    <script src="{{url('js/sessionIndex.js')}}"></script>

    <!-- Library MD5 Javascript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/core.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/md5.js"></script>

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
                    <h1 class="h3 mb-0 text-gray-800">Adding User</h1>
                </div>

                <!-- Content Row -->
                <!-- haru buat row untuk setiap tampilan -->
                <!-- end row -->

                <!-- id nu === new user -->
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Form Add New User</h6>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <h6>Fullname : </h6>
                            <input type="text" id="nu_fullname" class="form-control form-control-user" placeholder="eg. Jhon Doe">
                        </div>
                        <div class="form-group">
                            <h6>E-mail : </h6>
                            <input type="email" id="nu_email" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="eg. jhondoe@email.com">
                        </div>
                        <div class="form-group">
                            <h6>Password : </h6>
                            <input type="password" id="nu_password" class="form-control form-control-user" id="exampleInputPassword" placeholder="eg. jhonDoe12!@">
                        </div>
                        <div class="form-group">
                            <h6>Re-Type Password : </h6>
                            <input type="password" id="nu_rePassword" class="form-control form-control-user" id="exampleInputPassword" placeholder="eg. jhonDoe12!@">
                        </div>
                        <div class="form-group">
                            <button type="submit" id="addUserButton" class="btn btn-primary btn-user btn-block" onclick="createNewUser()">Add New User</button>
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

<!-- Page level custom scripts -->
<script src="{{url('js/demo/chart-area-demo.js')}}"></script>
<script src="{{url('js/demo/chart-pie-demo.js')}}"></script>

<!--Script if button enter tapped-->
<script>
    var triggerButton = document.getElementById("nu_rePassword");
    triggerButton.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("addUserButton").click();
        }
    });
</script>


</body>

</html>
