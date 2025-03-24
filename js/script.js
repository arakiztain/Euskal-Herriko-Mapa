
let menuBtn = document.createElement("button");
menuBtn.id = "menu-btn";
menuBtn.innerHTML = "☰";
document.body.appendChild(menuBtn);


menuBtn.addEventListener("click", function () {
    let menu = document.getElementById("municipios-list");
    menu.classList.toggle("active");
});

fetch('version.txt') // Un archivo con un número de versión
    .then(res => res.text())
    .then(version => {
        if (localStorage.getItem('version') !== version) {
            localStorage.setItem('version', version);
            location.reload();
        }
    });
const nuevaURL = window.location.pathname + "?v=" + new Date().getTime();
window.history.pushState({}, "", nuevaURL);
///*   
const provincias = {
    //Araba
    "Araba": ["Agurain", "Amurrio", "Aiara", "Aramaio", "Añana", "Argantzon", "Armiñon", "Arraia-Maeztu", "Arratzua-Ubarrundia", "Artziniega", "Asparrena", "Barrundia", "Bastida", "Berantevilla", "Bernedo", "Burgelu", "Donemiliaga",
        "Dulantzi", "Ekora", "Eltziego", "Bilar", "Erriberabeitia", "Erriberagoitia", "Eskuernaga", "Gasteiz", "Gaubea", "Guardia", "Harana", "Iruraiz-Gauna", "Iruña Oka", "Kanpezu", "Kripan", "Kuartango", "Lagran",
        "Lantaron", "Lantziego", "Lapuebla Labarka", "Laudio", "Legutio", "Leza", "Mañueta", "Moreta", "Nabaridas", "Oion", "Okondo", "Samaniego", "Trebiñu", "Urizaharra", "Urkabustaiz", "Zalduondo", "Zanbrana",
        "Zigoitia", "Zuia"],
    //Bizkaia
    "Bizkaia": ['Abadiño', 'Abanto', 'Ajangiz', 'Alonsotegi', 'Amoroto', 'Arakaldo', 'Arantzazu', 'Areatza', 'Arrankudiaga', 'Arratzu', 'Arrieta', 'Arrigorriaga', 'Arteaga', 'Artzentales', 'Atxondo',
        'Aulesti', 'Bakio', 'Balmaseda', 'Barakaldo', 'Barrika', 'Basauri', 'Bedia', 'Berango', 'Bermeo', 'Berriatua', 'Berriz', 'Bilbo', 'Busturia', 'Derio', 'Dima', 'Durango', 'Ea', 'Elantxobe', 'Elorrio',
        'Erandio', 'Ereño', 'Ermua', 'Errigoiti', 'Etxebarri', 'Etxebarria', 'Forua', 'Fruiz', 'Galdakao', 'Galdames', 'Gamiz-Fika', 'Garai', 'Gatika', 'Gautegiz Arteaga', 'Gernika-Lumo', 'Getxo', 'Gizaburuaga',
        'Gordexola', 'Gorliz', 'Gueñes', 'Ibarrangelu', 'Igorre', 'Ispaster', 'Iurreta', 'Izurtza', 'Maruri-Jatabe', 'Karrantza', 'Kortezubi', 'Lanestosa', 'Larrabetzu', 'Laukiz', 'Leioa', 'Lekeitio', 'Lemoa', 'Lemoiz',
        'Lezama', 'Loiu', 'Mallabia', 'Mañaria', 'Markina-Xemein', 'Mendata', 'Mendexa', 'Meñaka', 'Morga', 'Mundaka', 'Mungia', 'Munitibar', 'Murueta', 'Muskiz', 'Muxika', 'Nabarniz', 'Ondarroa', 'Orozko',
        'Ortuella', 'Otxandio', 'Plentzia', 'Portugalete', 'Santurtzi', 'Sestao', 'Sondika', 'Sopela', 'Garape', 'Sukarrieta', 'Trapagaran', 'Turtzioz', 'Ubide', 'Ugao', 'Urduliz', 'Urduña', 'Villaverde Turtzioz', 'Zaldibar',
        'Zalla', 'Zamudio', 'Zaratamo', 'Zeanuri', 'Zeberio', 'Zierbena', 'Ziortza-Bolibar', 'Zornotza', 'Usansolo'],
    //Gipuzkoa
    "Gipuzkoa": ['Abaltzisketa', 'Aduna', 'Aia', 'Aizarnazabal', 'Albiztur', 'Alegia', 'Alkiza', 'Altzaga', 'Altzo', 'Amezketa', 'Andoain', 'Anoeta', 'Antzuola', 'Arama', 'Aretxabaleta', 'Arrasate',
        'Asteasu', 'Astigarraga', 'Ataun', 'Azkoitia', 'Azpeitia', 'Baliarrain', 'Beasain', 'Beizama', 'Belauntza', 'Berastegi', 'Bergara', 'Berrobi', 'Bidania-Goiatz', 'Deba', 'Donostia', 'Eibar', 'Elduain',
        'Elgeta', 'Elgoibar', 'Errenteria', 'Errezil', 'Eskoriatza', 'Ezkio-Itsaso', 'Gabiria', 'Gaintza', 'Gaztelu', 'Getaria', 'Hernani', 'Hernialde', 'Hondarribia', 'Ibarra', 'Idiazabal', 'Ikaztegieta',
        'Irun', 'Irura', 'Itsasondo', 'Larraul', 'Lasarte-Oria', 'Lazkao', 'Leaburu', 'Legazpi', 'Legorreta', 'Leintz-Gatzaga', 'Lezo', 'Lizartza', 'Mendaro', 'Mutiloa', 'Mutriku', 'Oiartzun', 'Olaberria',
        'Oñati', 'Ordizia', 'Orendain', 'Orexa', 'Orio', 'Ormaiztegi', 'Pasaia', 'Segura', 'Soraluze', 'Tolosa', 'Urnieta', 'Urretxu', 'Usurbil', 'Amasa', 'Zaldibia', 'Zarautz', 'Zegama', 'Zerain',
        'Zestoa', 'Zizurkil', 'Zumaia', 'Zumarraga'],
    //Lapurdi
    "Lapurdi": ['Ahetze', 'Ahurti', 'Ainhoa', 'Angelu', 'Arbona', 'Arrangoitze', 'Azkaine', 'Baiona', 'Bardoze', 'Basusarri', 'Bezkoitze', 'Biarritz', 'Bidarte', 'Biriatu', 'Bokale', 'Donibane Lohitzune', 'Ezpeleta',
        'Getaria L', 'Gixune', 'Haltsu', 'Hazparne', 'Hendaia', 'Hiriburu', 'Itsasu', 'Jatsu', 'Kanbo', 'Larresoro', 'Lehuntze', 'Lekorne', 'Lekuine', 'Luhuso', 'Makea', 'Milafranga', 'Mugerre', 'Sara', 'Senpere', 'Urketa',
        'Urruña', 'Uztaritze', 'Ziburu', 'Zuraide'],
    //Nafarroa
    "Nafarroa": ['Abaigar', 'Abartzuza', 'Abaurregaina', 'Abaurrepea', 'Aberin', 'Ablitas', 'Adiotz', 'Agoitz', 'Aiegi', 'Ahuntzegi', 'Alesbes', 'Allin', 'Allo', 'Altsasu', 'Ameskoabarrena', 'Andosilla', 'Antsoain',
        'Antzin', 'Anue', 'Añorbe', 'Araitz', 'Arakil', 'Aranaratxe', 'Arandibarren', 'Aranguren', 'Arano', 'Arantza', 'Aras', 'Arbizu', 'Arellano', 'Areso', 'Arketas', 'Aria', 'Aribe', 'Armañantzas', 'Arranotegi',
        'Arroitz', 'Arruazu', 'Artaxoa', 'Artazu', 'Artzibar', 'Atarrabia', 'Atetz', 'Auritz', 'Azagra', 'Azkoien', 'Azuelo', 'Bakaiku', 'Balterra', 'Barañain', 'Barasoain', 'Barbarin', 'Bargota', 'Barillas', 'Basaburua',
        'Baztan', 'Beintza-Labaien', 'Beire', 'Bera', 'Beraskoain', 'Berbintzana', 'Beriain', 'Berriobeiti', 'Berriozar', 'Bertizarana', 'Betelu', 'Bidankoze', 'Bidaurreta', 'Biurrun-Olkotz', 'Buñuel', 'Burgi', 'Burlata',
        'Cabanillas', 'Cadreita', 'Caparroso', 'Cascante', 'Castejón', 'Corella', 'Cortes', 'Deio', 'Deierri', 'Deikaztelu', 'Desoio', 'Donamaria', 'Donamartiri Untz', 'Doneztebe', 'Dorreaga', 'Eguesibar', 'El Busto',
        'Elgorriaga', 'Elizagorria', 'Elo', 'Eneritz', 'Eratsun', 'Ergoiena', 'Erriberri', 'Erroibar', 'Erromantzatua', 'Erronkari', 'Esa', 'Eslaba', 'Espartza Zaraitzu', 'Esprontzeda', 'Esteribar', 'Etaiu', 'Etxalar',
        'Etxarri', 'Etxarri-Aranatz', 'Etxauri', 'Eulate', 'Ezkabarte', 'Ezkaroze', 'Ezkurra', 'Ezporogi', 'Faltzes', 'Fitero', 'Fontellas', 'Funes', 'Fustiñana', 'Galar', 'Galipentzu', 'Galoze', 'Garaioa', 'Garde',
        'Gares', 'Garinoain', 'Garralda', 'Gazteluberri', 'Uxanuri', 'Gesalatz', 'Girgillao', 'Goizueta', 'Goñerri', 'Gortza', 'Hiriberri', 'Ibargoiti', 'Igantzi', 'Iguzkitza', 'Imotz', 'Irañeta', 'Irunberri',
        'Iruña', 'Irurtzun', 'Ituren', 'Iturmendi', 'Iturriaga', 'Itza', 'Itzagaondoa', 'Itzaltzu', 'Izaba', 'Jaitz', 'Jaurrieta', 'Karkar', 'Kaseda', 'Lakuntza', 'Lana', 'Lantz', 'Lapoblación', 'Larraga',
        'Larragoa', 'Larraun', 'Leatxe', 'Ledea', 'Legarda', 'Legaria', 'Leitza', 'Lekunberri', 'Leotz', 'Lerga', 'Lerin', 'Lesaka', 'Lezaun', 'Lizarra', 'Lizoainibar-Arriasgoiti', 'Lodosa', 'Longida', 'Lukin',
        'Luzaide', 'Mañeru', 'Marañón', 'Martzilla', 'Melida', 'Mendabia', 'Mendaza', 'Mendigorria', 'Metauten', 'Milagro', 'Miranda Arga', 'Monteagudo', 'Morentiain', 'Mues', 'Murtxante', 'Murieta',
        'Murelu Konde', 'Murelu Hautsi', 'Muruzabal', 'Nabaskoze', 'Nazar', 'Noain-Elortzibar', 'Obanos', 'Odieta', 'Oibar', 'Oitz', 'Oko', 'Olaibar', 'Olatzagutia', 'Olexoa', 'Ollaran', 'Oloritz', 'Oltza',
        'Orbaitzeta', 'Orbara', 'Orisoain', 'Orkoien', 'Orontze', 'Orotz-Betelu', 'Orreaga', 'Oteitza', 'Otsagabia', 'Petilla Aragoi', 'Piedramillera', 'Pitillas', 'Puiu', 'Ribaforada', 'Saldisa', 'San Adrián',
        'Santakara', 'Santzol', 'Sartaguda', 'Sartze', 'Sesma', 'Sorlada', 'Sunbilla', 'Tafalla', 'Tebas-Muru Artederreta', 'Tirapu', 'Torralba', 'Tulebras', 'Tutera', 'Txulapain', 'Uharte', 'Uharte Arakil', 'Ukar',
        'Ultzama', 'Untzitibar', 'Untzue', 'Urantzia', 'Urdazubi', 'Urdiain', 'Urraulpe', 'Urrulgaine', 'Urrotz', 'Urrotz-Hiria', 'Urzainki', 'Uterga', 'Uxue', 'Uztarroze', 'Viana', 'Xabier', 'Zabaltza', 'Zangoza',
        'Zare', 'Zarrakaztelu', 'Zentroniko', 'Ziordia', 'Zirauki', 'Ziritza', 'Zizur', 'Zizur Nagusia', 'Zubieta', 'Zugarramurdi', 'Zuñiga', 'Ahatsa-Altzieta-Bazkazane', 'Aiherra', 'Ainhize-Monjolose', 'Aintzila',
        'Aiziritze-Gamue-Zohazti', 'Akamarre', 'Aldude', 'Amendüze-Unaso', 'Amorotze-Zokotze', 'Anhauze', 'Arberatze-Zilhekoa', 'Arboti-Zohota', 'Arhantsusi', 'Armendaritze', 'Arnegi', 'Arrosa', 'Arrueta-Sarrikota',
        'Azkarate', 'Baigorri', 'Banka', 'Bastida Arberoa', 'Behaskane-Laphizketa', 'Behauze', 'Behorlegi', 'Bidarrai', 'Bidaxune', 'Bithiriña', 'Bunuze', 'Burgue-Erreiti', 'Buztintze-Hiriberri', 'Donaixti-Ibarre',
        'Donamartiri', 'Donapaleu', 'Donazaharre', 'Donibane Garazi', 'Donoztiri', 'Duzunaritze-Sarasketa', 'Eiheralarre', 'Erango', 'Ezkoze', 'Ezterenzubi', 'Gabadi', 'Gamarte', 'Garrüze', 'Heleta', 'Hozta',
        'Ibarrola', 'Iholdi', 'Ilharre', 'Irisarri', 'Irulegi', 'Izpura', 'Izturitze', 'Izura-Azme', 'Jatsu Garazi', 'Jutsi', 'Labetze-Bizkai', 'Lakarra', 'Landibarre', 'Larribarre-Sorhapürü', 'Larzabale-Arroze-Zibitze',
        'Lasa', 'Lekunberri Garazi', 'Lüküze-Altzümarta', 'Martxueta', 'Mehaine', 'Mendibe', 'Oragarre', 'Ortzaize', 'Ostankoa', 'Samatze', 'Suhuskune', 'Uharte Garazi', 'Uhartehiri', 'Urepele', 'Zaro'],
    //Zuberoa
    "Zuberoa": ['Ainharbe', 'Aloze-Ziboze-Onizegaine', 'Altzai-Altzabeheti-Zunharreta', 'Altzürükü', 'Arrokiaga', 'Arüe-Ithorrotze-Olhaibi', 'Atharratze-Sorholüze', 'Barkoxe', 'Berrogaine-Larüntze', 'Bildoze-Onizepea',
        'Domintxaine-Berroeta', 'Eskiula', 'Etxarri Z', 'Etxebarre', 'Ezpeize-Ündüreine', 'Gamere-Zihiga', 'Garindaine', 'Gotaine-Irabarne', 'Hauze', 'Idauze-Mendi', 'Iruri', 'Jeztaze', 'Lakarri-Arhane-Sarrikotagaine',
        'Larraine', 'Lexantzü-Zunharre', 'Ligi-Atherei', 'Liginaga-Astüe', 'Lohitzüne-Oihergi', 'Maule-Lextarre', 'Mendikota', 'Mitikile-Larrori-Mendibile', 'Montori', 'Muskildi', 'Ospitalepea', 'Ozaraine-Erribareita',
        'Ozaze-Zühara', 'Pagola', 'Sarrikotapea', 'Sohüta', 'Urdatx', 'Urdiñarbe', 'Ürrüstoi-Larrabile', 'Zalgize-Doneztebe']
};
//*/

// Herrialdetako margoek
const coloresProvincias = {
    "Bizkaia": "#0f7e21 ", // Orlegie
    "Gipuzkoa": "#107bca ", // Oztiñe
    "Araba": "#dcdc0a ", // Bellegi
    "Nafarroa": "#f02727", // Gorrie
    "Lapurdi": "purple", // Fucsia
    "Zuberoa": "#0a5762 " // Cyan
};




// Cargar el archivo SVG y manejar los eventos
fetch(`mapa.svg?timestamp=${new Date().getTime()}`)
    .then(response => response.text())
    .then(svg => {
        document.getElementById('mapa-container').innerHTML = svg;

        const svgElement = document.querySelector('svg');
        const coloresGuardados = JSON.parse(localStorage.getItem('coloresMunicipios')) || {};



        // Función para aplicar colores guardados
        function aplicarColoresGuardados() {
            Object.keys(coloresGuardados).forEach(id => {
                const paths = document.querySelectorAll(`path[id="${id}"]`);
                paths.forEach(path => path.style.fill = coloresGuardados[id]);
            });
        }

        // Función para actualizar la lista de municipios
        function actualizarLista() {
            const provinciaListElement = document.getElementById('provincia-list');
            const tituloElement = document.getElementById('titulo');
            provinciaListElement.innerHTML = '';

            let totalMunicipiosGlobal = 0;
            let totalVisitadosGlobal = 0;

            Object.keys(provincias).sort().forEach(provincia => {
                const selectedMunicipios = provincias[provincia].filter(id => coloresGuardados[id] === coloresProvincias[provincia]);
                const totalMunicipios = provincias[provincia].length;

                totalMunicipiosGlobal += totalMunicipios;
                totalVisitadosGlobal += selectedMunicipios.length;

                const porcentaje = totalMunicipios > 0 ? (selectedMunicipios.length / totalMunicipios) * 100 : 0;

                const provinciaDiv = document.createElement('div');
                provinciaDiv.className = 'provincia';
                provinciaDiv.innerHTML = `${provincia} (%${porcentaje.toFixed(2)})`;

                const ul = document.createElement('ul');
                selectedMunicipios.sort().forEach(id => {
                    const li = document.createElement('li');
                    li.className = 'municipio';
                    li.textContent = id;
                    ul.appendChild(li);
                });

                provinciaDiv.appendChild(ul);
                provinciaListElement.appendChild(provinciaDiv);
            });

            // Calcular el porcentaje global
            const porcentajeGlobal = totalMunicipiosGlobal > 0 ? (totalVisitadosGlobal / totalMunicipiosGlobal) * 100 : 0;

            // Actualizar el título con el porcentaje global
            tituloElement.textContent = `Egondako herrialdetan (%${porcentajeGlobal.toFixed(2)})`;

            //Mugikorrerako
            let contadorPorcentaje = document.createElement("div");
            contadorPorcentaje.id = "contador-porcentaje";
            document.getElementById("mapa-container").appendChild(contadorPorcentaje);

            // Mostrar el porcentaje con solo dos decimales
            contadorPorcentaje.innerText = `Euskal Herria: %${porcentajeGlobal.toFixed(2)}`;
        }


        // Función para transformar texto
        function transformarTexto(texto) {
            const excepciones = ['de', 'la', 'el', 'en', 'y', 'a', 'del', 'al']; // Lista de palabras en minúsculas

            return texto
                .split(/(\s|-)/) // Divide pero conserva los separadores (espacios o guiones)
                .map((part, index, arr) => {
                    if (part === ' ' || part === '-') return part; // Mantener separadores sin cambios
                    const esPrimeraPalabra = (index === 0 || arr[index - 1] === ' ' || arr[index - 1] === '-');
                    const palabraEnMin = part.toLowerCase();

                    if (!esPrimeraPalabra && excepciones.includes(palabraEnMin)) {
                        return palabraEnMin; // Mantener en minúsculas si está en la lista y no es la primera palabra
                    }
                    return palabraEnMin.charAt(0).toUpperCase() + palabraEnMin.slice(1);
                })
                .join(''); // Une todo respetando los separadores
        }


        // Aplicar colores guardados inicialmente
        aplicarColoresGuardados();
        actualizarLista();

        svgElement.addEventListener('click', function (event) {
            if (event.target.tagName === 'path') {
                const municipioId = event.target.id;
                let provinciaColor = null;

                // Buscar a qué provincia pertenece el municipio
                Object.keys(provincias).forEach(provincia => {
                    if (provincias[provincia].includes(municipioId)) {
                        provinciaColor = coloresProvincias[provincia];
                    }
                });

                // Si el municipio ya está coloreado, descolorearlo
                if (coloresGuardados[municipioId]) {
                    // Eliminar color
                    const paths = document.querySelectorAll(`path[id="${municipioId}"]`);
                    paths.forEach(path => path.style.fill = '#ffeabf'); // Color por defecto
                    delete coloresGuardados[municipioId];
                } else {
                    // Solicitar el nombre del municipio mediante un prompt
                    const inputNombre = prompt('Sartu ezazu udalerriaren izena:', municipioId);
                    if (inputNombre) {
                        // Transformar el texto: primera letra mayúscula, resto minúsculas
                        const nombreNormalizado = transformarTexto(inputNombre);

                        // Verificar si el municipio ingresado existe en el mapa
                        const municipioExiste = Object.values(provincias).flat().includes(nombreNormalizado);

                        let alerta = false;

                        if (municipioExiste) {
                            const paths = document.querySelectorAll(`path[id="${nombreNormalizado}"]`);
                            if (paths.length > 0) {
                                // Buscar el color de la provincia del municipio ingresado
                                Object.keys(provincias).forEach(provincia => {
                                    if (coloresGuardados[nombreNormalizado]) {
                                        if (!alerta) {
                                            alert("Udalerri hau jadanik dau mapan");
                                            alerta = true;
                                        }

                                    }
                                    else if (provincias[provincia].includes(nombreNormalizado)) {
                                        provinciaColor = coloresProvincias[provincia];
                                    }
                                });

                                // Colorear el municipio con el color de su provincia
                                paths.forEach(path => path.style.fill = provinciaColor);
                                coloresGuardados[nombreNormalizado] = provinciaColor;
                            }
                        } else {
                            alert("Ez da aurkitu udalerria mapan.");
                        }
                    }
                }

                // Guardar colores y actualizar lista
                localStorage.setItem('coloresMunicipios', JSON.stringify(coloresGuardados));
                actualizarLista();
            }
        });
    })
    .catch(error => console.error('Ezin izan da SVG-a kargeu:', error));
//localStorage.clear();
//console.dir(coloresProvincias);