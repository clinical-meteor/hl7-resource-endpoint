





Meteor.methods({
  initSixNodes: function(){
    console.log('initSixNodes')
    var defaultEndpoints = [];

    for (let index = 0; index < 6; index++) {
      defaultEndpoints.push({
        "OrganizationName": index,
        "FHIRPatientFacingURI": ""
      })      
    }
    defaultEndpoints.forEach(function(endpoint){
      Meteor.call('createEndpoint', endpoint);
    })
  },
  initTwelveNodes: function(){
    console.log('initTwelveNodes')
    var defaultEndpoints = [];

    for (let index = 0; index < 12; index++) {
      defaultEndpoints.push({
        "OrganizationName": index,
        "FHIRPatientFacingURI": ""
      })      
    }
    defaultEndpoints.forEach(function(endpoint){
      Meteor.call('createEndpoint', endpoint);
    })

  },
  initEpicNodes: function(){
    console.log('initEpicNodes')
    var defaultEndpoints = [];

    for (let index = 0; index < 110; index++) {
      defaultEndpoints.push({
        "OrganizationName": index,
        "FHIRPatientFacingURI": ""
      })      
    }
    defaultEndpoints.forEach(function(endpoint){
      Meteor.call('createEndpoint', endpoint);
    })

  },
  initMedicareHospitalodes: function(){
    console.log('initMedicareHospitalodes')
    var defaultEndpoints = [];

    for (let index = 0; index < 5174; index++) {
      defaultEndpoints.push({
        "OrganizationName": index,
        "FHIRPatientFacingURI": ""
      })      
    }
    defaultEndpoints.forEach(function(endpoint){
      Meteor.call('createEndpoint', endpoint);
    })

  },
  initChicagoHospitalNodes: function(){ 
    console.log('initChicagoHospitalNodes')
    var defaultEndpoints = [];

    for (let index = 0; index < 100; index++) {
      defaultEndpoints.push({
        "OrganizationName": index,
        "FHIRPatientFacingURI": ""
      })      
    }
    defaultEndpoints.forEach(function(endpoint){
      Meteor.call('createEndpoint', endpoint);
    })

  },
  initAppleHealthkitNodes: function(){
    console.log('initAppleHealthkitNodes')
    var defaultEndpoints = [];

    for (let index = 0; index < 300; index++) {
      defaultEndpoints.push({
        "OrganizationName": index,
        "FHIRPatientFacingURI": ""
      })      
    }
    defaultEndpoints.forEach(function(endpoint){
      Meteor.call('createEndpoint', endpoint);
    })

  },
  createEndpoint: function(endpointData){
    console.log('createEndpoint')
    check(endpointData, Object);

    var newEndpoint = {
      status: 'off',
      connectionType: {
        display: "FHIR Base",
        code: 'oauth'
      }, 
      name: endpointData.OrganizationName,
      address: endpointData.FHIRPatientFacingURI
    }

    // if (process.env.NODE_ENV === 'test') {
      console.log('Creating Endpoint...');
      Endpoints.insert(newEndpoint, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Endpoint created: ' + result);
        }
      });
    // } else {
    //   console.log('This command can only be run in a test environment.');
    //   console.log('Try setting NODE_ENV=test');
    // }
  },
  initializeEndpoint: function(){
    console.log('initializeEndpoint')
    if (Endpoints.find().count() === 0) {
      console.log("No records found in Endpoints collection.  Lets create some...");

      var defaultEndpoints = [
        {
          "OrganizationName": "AdvantageCare Physicians",
          "FHIRPatientFacingURI": "https://epwebapps.acpny.com/FHIRproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Altru Health System",
          "FHIRPatientFacingURI": "https://epicsoap.altru.org/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Anne Arundel Medical Center",
          "FHIRPatientFacingURI": "https://epicarr.aahs.org/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Ascension WI",
          "FHIRPatientFacingURI": "https://eprescribe.wfhc.org/FHIRproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Atrius Health",
          "FHIRPatientFacingURI": "https://iatrius.atriushealth.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Aurora Health Care - myAurora",
          "FHIRPatientFacingURI": "https://EpicFHIR.aurora.org/FHIR/MYAURORA/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "BayCare Clinic - myBayCare",
          "FHIRPatientFacingURI": "https://EpicFHIR.aurora.org/FHIR/MYBAYCARE/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Baylor College of Medicine",
          "FHIRPatientFacingURI": "https://fhir.clinical.bcm.edu/Stage1Fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Beaumont Health",
          "FHIRPatientFacingURI": "https://moc.beaumont.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Bellin Health",
          "FHIRPatientFacingURI": "https://arr.thedacare.org/BLN/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Bend Memorial Clinic",
          "FHIRPatientFacingURI": "https://epicsoap.bmctotalcare.com/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "BJC & Washington University",
          "FHIRPatientFacingURI": "https://epicproxy.et0965.epichosted.com/FHIRProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Bronson Healthcare Group",
          "FHIRPatientFacingURI": "https://hygieia.bronsonhg.org/FHIRProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Carle Foundation Hospital & Physician Group",
          "FHIRPatientFacingURI": "https://epicsoap.carle.com/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Catholic Health Services of Long Island",
          "FHIRPatientFacingURI": "https://epx1.chsli.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Cedars-Sinai Health System",
          "FHIRPatientFacingURI": "https://cslinkmobile.csmc.edu/fhirproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "CentraCare Health and Affiliates",
          "FHIRPatientFacingURI": "https://epicmobile.centracare.com/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Centura Health",
          "FHIRPatientFacingURI": "https://epic-p-mobile.centura.org/prd-fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Charlotte Eye Ear Nose & Throat Associates",
          "FHIRPatientFacingURI": "https://fhirprd.ceenta.com/proxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Children's Health System of Texas",
          "FHIRPatientFacingURI": "https://fhir.childrens.com/prd/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Children's Hospital of Wisconsin",
          "FHIRPatientFacingURI": "https://EpicSoapProxy.chw.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Community Healthcare System",
          "FHIRPatientFacingURI": "https://webproxy.comhs.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Cone Health",
          "FHIRPatientFacingURI": "https://epsoap.conehealth.com/FHIRProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Covenant HealthCare",
          "FHIRPatientFacingURI": "https://epichaiku.chs-mi.com/FHIRPROXY/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Duke Health",
          "FHIRPatientFacingURI": "https://health-apis.duke.edu/FHIR/patient/DSTU2/"
        },
        {
          "OrganizationName": "Eisenhower Medical Center",
          "FHIRPatientFacingURI": "https://epicarr.emc.org/EMC_FHIR_PRD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "El Camino Hospital",
          "FHIRPatientFacingURI": "https://rwebproxy.elcaminohospital.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Elliot Health System",
          "FHIRPatientFacingURI": "https://surescriptprd.elliot-hs.org/FHIR_PROD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Geisinger",
          "FHIRPatientFacingURI": "https://geisapi.geisinger.edu/FHIR_PROD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Geisinger Affiliates",
          "FHIRPatientFacingURI": "https://aspapi.geisinger.edu/FHIR_ASPPROD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Genesis Healthcare System",
          "FHIRPatientFacingURI": "https://fhir.genesishcs.org/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Greater Hudson Valley Health System",
          "FHIRPatientFacingURI": "https://epic.ormc.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Gundersen Health System",
          "FHIRPatientFacingURI": "https://scproxy.gundersenhealth.org/FHIRARR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Hackensack Meridian Health",
          "FHIRPatientFacingURI": "https://mepic.hackensackumc.net/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Hattiesburg Clinic and Forrest General Hospital",
          "FHIRPatientFacingURI": "https://soapprod.hattiesburgclinic.com/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Health Ventures of Central Iowa",
          "FHIRPatientFacingURI": "https://emrproxy.mcfarlandclinic.com/FHIRProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Hennepin County Medical Center",
          "FHIRPatientFacingURI": "https://hie.hcmed.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "HonorHealth",
          "FHIRPatientFacingURI": "https://interconnect.honorhealth.com/Interconnect-FHIR-PRD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Hospital for Special Surgery",
          "FHIRPatientFacingURI": "https://epicproxy.et0927.epichosted.com/FHIRProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Hurley Medical Center",
          "FHIRPatientFacingURI": "https://fhir.hurleymc.com/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Inova and Valley Health",
          "FHIRPatientFacingURI": "https://epicrpprd.inova.org/fhirrp/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Johns Hopkins Medicine",
          "FHIRPatientFacingURI": "https://epicmobile.johnshopkins.edu/FHIR_PRD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "JPS Health Network",
          "FHIRPatientFacingURI": "https://fhir.jpshealth.org:4431/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Kadlec Health System",
          "FHIRPatientFacingURI": "https://haiku-prd.kchart.org/fhirproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Lakeland Health",
          "FHIRPatientFacingURI": "https://fhir.lakelandregional.org/fhirproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Lancaster General Health",
          "FHIRPatientFacingURI": "https://epicproxy.lghealth.org/FHIRProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Legacy Health",
          "FHIRPatientFacingURI": "https://lhspdxfhirprd.lhs.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "MaineHealth",
          "FHIRPatientFacingURI": "https://fhir.mainehealth.org/FHIRPRD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Martin Health System",
          "FHIRPatientFacingURI": "https://prodrx919.martinhealth.org/FHIR-PRD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Medisys Health Network",
          "FHIRPatientFacingURI": "https://eprescribe-p.medisys.org/fhir-prd/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "MemorialCare",
          "FHIRPatientFacingURI": "https://fhir.memorialcare.org/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Mercy Health - OH, KY",
          "FHIRPatientFacingURI": "https://chperx.health-partners.org/Proxy-FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Mercy Health System - WI",
          "FHIRPatientFacingURI": "https://epicproxy.mhsjvl.org/FHIRproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Mercy Medical Center",
          "FHIRPatientFacingURI": "https://pdsoap.mercycare.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Metro Health - Michigan",
          "FHIRPatientFacingURI": "https://arrprd.metrohealth.net/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "MetroHealth - OH",
          "FHIRPatientFacingURI": "https://fhir.metrohealth.org/fhir_prd/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Nebraska Medicine",
          "FHIRPatientFacingURI": "https://ocsoapprd.nebraskamed.com/FHIR-PRD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "North Oaks",
          "FHIRPatientFacingURI": "https://soapproxyprd.northoaks.org/nohsfhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Northeast Georgia Health System",
          "FHIRPatientFacingURI": "https://wpprod.nghs.com/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "NorthShore University Health System",
          "FHIRPatientFacingURI": "https://haiku.northshore.org:4343/Interconnect-2017_FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Norton Healthcare",
          "FHIRPatientFacingURI": "https://epicsoap.nortonhealthcare.org/FHIRPRD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Novant Health",
          "FHIRPatientFacingURI": "https://webproxy.mynovant.org/fhir-prd/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "OCHIN",
          "FHIRPatientFacingURI": "https://webprd.ochin.org/prd-fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Ochsner Health System",
          "FHIRPatientFacingURI": "https://myc.ochsner.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "OrthoVirginia",
          "FHIRPatientFacingURI": "https://epicproxy.et1015.epichosted.com/FHIRProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Overlake Hospital Medical Center",
          "FHIRPatientFacingURI": "https://sfd.overlakehospital.org/FHIRproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Parkview Health",
          "FHIRPatientFacingURI": "https://epicprod-mobile.parkview.com/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Premier Health",
          "FHIRPatientFacingURI": "https://rx.premierhealthpartners.org/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Presence Health",
          "FHIRPatientFacingURI": "https://epicmobile.presencehealth.org/fhirPRD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Providence Health & Services - Alaska",
          "FHIRPatientFacingURI": "https://haikuak.providence.org/fhirproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Providence Health & Services - Oregon/California",
          "FHIRPatientFacingURI": "https://haikuor.providence.org/fhirproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Providence Health & Services - Washington/Montana",
          "FHIRPatientFacingURI": "https://haikuwa.providence.org/fhirproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Riverside Medical Clinic",
          "FHIRPatientFacingURI": "https://sf1.rmcps.com/FHIRProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Rochester Regional Health",
          "FHIRPatientFacingURI": "https://epicarr.rochesterregional.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Rockford Memorial Hospital",
          "FHIRPatientFacingURI": "https://haiku.rhsnet.org/FHIRProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Rush University Medical Center",
          "FHIRPatientFacingURI": "https://epicproxy.rush.edu/fhir-prd/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Saint Luke's Health System",
          "FHIRPatientFacingURI": "https://epicmobile.corp.saint-lukes.org/FHIRPROXY/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Salem Health",
          "FHIRPatientFacingURI": "https://prd.salemhealth.org/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Sanford Health",
          "FHIRPatientFacingURI": "https://eprescribe.sanfordhealth.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Sansum Clinic",
          "FHIRPatientFacingURI": "https://wavesurescripts.sansumclinic.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "SCL Health",
          "FHIRPatientFacingURI": "https://sclprdproxy.sclhs.net/FHIRPRD-2017/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "SLUCare / SSM-SLUH",
          "FHIRPatientFacingURI": "https://fhir.sluhealth.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Southcoast Health",
          "FHIRPatientFacingURI": "https://epicpproxy.southcoast.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Spectrum Health",
          "FHIRPatientFacingURI": "https://epicarr02.spectrumhealth.org/EpicFHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "SSM Health",
          "FHIRPatientFacingURI": "https://fhir.ssmhc.com/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "SSM Health WI Dean Medical Group and Affiliates",
          "FHIRPatientFacingURI": "https://deanrx.deancare.com/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "St. Elizabeth Healthcare",
          "FHIRPatientFacingURI": "https://sehproxy.stelizabeth.com/arr-fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Stanford Health Care",
          "FHIRPatientFacingURI": "https://sfd.stanfordmed.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Stormont Vail Health",
          "FHIRPatientFacingURI": "https://epicsoap.stormontvail.org/FHIRproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "SUNY Upstate Medical University",
          "FHIRPatientFacingURI": "https://epicedge.upstate.edu/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Sutter Health",
          "FHIRPatientFacingURI": "https://apiservices.sutterhealth.org/ifs/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Swedish Medical Center",
          "FHIRPatientFacingURI": "https://haiku.swedish.org/fhirproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Tampa General Hospital",
          "FHIRPatientFacingURI": "https://prodsoap1.tgh.org/fhir/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "TempleHealth",
          "FHIRPatientFacingURI": "https://epicaccess.templehealth.org/FhirProxyPrd/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Texas Children's Hospital",
          "FHIRPatientFacingURI": "https://mobileapps.texaschildrens.org/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "The Portland Clinic",
          "FHIRPatientFacingURI": "https://tpc-shield.tpcllp.com/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "ThedaCare",
          "FHIRPatientFacingURI": "https://arr.thedacare.org/TC/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Tower Health",
          "FHIRPatientFacingURI": "https://epicsoap.readinghospital.org/FHIR-PRD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "UCLA Medical Center",
          "FHIRPatientFacingURI": "https://arrprox.mednet.ucla.edu/FHIRPRD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "UCSF Health",
          "FHIRPatientFacingURI": "https://vip-fhir.ucsfmedicalcenter.org/FhirProxies/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "UF Health",
          "FHIRPatientFacingURI": "https://epicsoap.shands.ufl.edu/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "UNC Health Care",
          "FHIRPatientFacingURI": "https://epsoap.unch.unc.edu/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "UnityPoint Health",
          "FHIRPatientFacingURI": "https://epicfhir.unitypoint.org/ProdFHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "University of Arkansas for Medical Sciences",
          "FHIRPatientFacingURI": "https://ucsoap.uams.edu/FHIRProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "University of California San Diego",
          "FHIRPatientFacingURI": "https://epicproxy.et0502.epichosted.com/FHIRProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "University of Texas Southwestern Medical Center",
          "FHIRPatientFacingURI": "https://EpicIntprxyPRD.swmed.edu/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "UW Health And Affiliates - Wisconsin",
          "FHIRPatientFacingURI": "https://epicproxy.hosp.wisc.edu/FhirProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Valley Medical Center",
          "FHIRPatientFacingURI": "https://FHIR.valleymed.org/FHIR-PRD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Vidant Health",
          "FHIRPatientFacingURI": "https://2017prdfhir.vidanthealth.com/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Weill Cornell Medicine",
          "FHIRPatientFacingURI": "https://epicmobile.med.cornell.edu/FHIR/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Wellmont Health System",
          "FHIRPatientFacingURI": "https://soap.wellmont.org/FHIRPRD/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "West Virginia University Medicine",
          "FHIRPatientFacingURI": "https://apps.mywvuchart.com/fhirproxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Yakima Valley Farm Workers Clinic",
          "FHIRPatientFacingURI": "https://epicproxy.et0943.epichosted.com/FHIRProxy/api/FHIR/DSTU2/"
        },
        {
          "OrganizationName": "Yuma Regional Medical Center",
          "FHIRPatientFacingURI": "https://yrmccare1.yumaregional.org/FHIR/api/FHIR/DSTU2/"
        }
      ];

      defaultEndpoints.forEach(function(endpoint){
        Meteor.call('createEndpoint', endpoint);
      })

    } else {
      console.log('Endpoints already exist.  Skipping.');
    }
  },
  dropEndpoints: function(){
    // if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping endpoints... ');
      Endpoints.find().forEach(function(endpoint){
        Endpoints.remove({_id: endpoint._id});
      });
    // } else {
    //   console.log('This command can only be run in a test environment.');
    //   console.log('Try setting NODE_ENV=test');
    // }
  }
});
