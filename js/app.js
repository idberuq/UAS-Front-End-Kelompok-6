$(function () {
    //CRUD Application

    var form = $(".form");
    var inputTitle = $("#barangTitle");
    var inputHarga = $("#barangHarga");
    var inputKategori = $("#barangKategori");
    var inputStok = $("#barangStok");
    var list = $(".barang-list");
    var url = "http://localhost:3000";

    function loadBarang() {

        $.ajax({
                method: "GET",
                url: url + "/barang",
                dataType: "json"
            }).done(function (response) {
                list.empty();
                insertBarang(response);

            })
            .fail(function (error) {
                console.log(error);
            })
    }

    loadBarang();


    function insertBarang(barang) {
        barang.forEach(function (e) {
            var li = $(
            `<li class="barang">
                <div class="barang-content">
                   <p class="barang-title">${e.title}</p>
                   <p class="barang-title">${e.harga}</p>
                   <p class="barang-title">${e.kategori}</p>
                   <p class="barang-title">${e.stok}</p>
                </div>
                <button class="btn-edit" data-id="${e.id}">Edit</button>
                <button class="btn-delete" data-id="${e.id}">Hapus</button>
            </li>`
        );
            list.append(li);
        })
    }


    function addBarang(title, harga, kategori, stok) {
        var item = {
            "title": title,
            "harga": harga,
            "kategori": kategori,
            "stok": stok
        };
        $.ajax({
                method: "POST",
                url: url + "/barang",
                dataType: "json",
                data: item
            }).done(function (response) {
                loadBarang();
            })
            .fail(function (error) {
                console.log(error);
            })


    }

    form.on("submit", function (e) {
        e.preventDefault();
        addBarang(inputTitle.val(), inputHarga.val(), inputKategori.val(), inputStok.val());
        inputTitle.val("");
        inputHarga.val("");
        inputKategori.val("");
        inputStok.val("");
    });

    function removebarang(id) {
        $.ajax({
                method: "DELETE",
                url: url + "/barang/" + id,
                dataType: "json",
            }).done(function (response) {
                loadBarang();
            })
            .fail(function (error) {
                console.log(error);
            })

    }

    list.on("click", ".btn-delete", function () {
        var id = $(this).data("id");
        removebarang(id);

    });

    function updateBarang(id, title, harga, kategori, stok) {

        var item = {
            "title": title,
            "harga": harga,
            "kategori": kategori,
            "stok": stok
        };
        $.ajax({
                method: "PATCH",
                url: url + "/barang/" + id,
                dataType: "json",
                data: item
            }).done(function (response) {
                loadBarang()

            })
            .fail(function (error) {
                console.log(error);
            });

    }
    list.on("click", ".btn-edit", function (e) {
        e.preventDefault();

        var titleToEdit = $(this).parent().find(".barang-title");
        var hargaToEdit = $(this).parent().find(".barang-harga");
        var kategoriToEdit = $(this).parent().find(".barang-kategori");
        var stokToEdit = $(this).parent().find(".barang-stok");

        $(this).toggleClass("editable");

        if ($(this).hasClass("editable")) {
            var titleToEditText = titleToEdit.text();
            var hargaToEditText = hargaToEdit.text();
            var kategoriToEditText = kategoriToEdit.text();
            var stokToEditText = stokToEdit.text();


            titleToEdit.replaceWith(`<input type="text" class="barang-title" value="${titleToEditText}" />`);
            hargaToEdit.replaceWith(`<input type="text" class="barang-harga" value="${hargaToEditText}" />`);
            kategoriToEdit.replaceWith(`<input type="text" class="barang-kategori" value="${kategoriToEditText}" />`);
            stokToEdit.replaceWith(`<input type="text" class="barang-stok" value="${stokToEditText}" />`);

            $(this).text("simpan");

        } else {
            var modId = $(this).data("id");
            var thisTitle = titleToEdit.val();
            var thisHarga = hargaToEdit.val();
            var thisKategori = kategoriToEdit.val();
            var thisStok = stokToEdit.val();

            titleToEdit.replaceWith(` <p class="barang-title">${thisTitle}</p>`);
            hargaToEdit.replaceWith(` <p class="barang-harga">${thisHarga}</p>`);
            kategoriToEdit.replaceWith(` <p class="barang-kategori">${thisKategori}</p>`);
            stokToEdit.replaceWith(`<p class="barang-stok">${thisStok}</p>`);

            updateBarang(modId, thisTitle, thisHarga, thisKategori, thisStok)
            $(this).text("edit");
        }
    });
});
