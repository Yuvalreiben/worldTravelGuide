// מערך תמונות יעד
let destinationImages = [
    { name: "דרום איטליה", url: "Images/italy.jpeg" },
    { name: "תאילנד", url: "Images/thailand.jpeg" },
    { name: "יוון", url: "Images/greece.jpeg" },
    { name: "יפן", url: "Images/japan.jpeg" }
];


// בדיקת תקינות להפעלת הכפתור
function checkFormValidity() {
    const nameElem = document.getElementById("travelerName");
    const radioButtons = document.getElementsByName("destination");
    let isRadioSelected = false;

    if (nameElem) {
        travelerName = nameElem.value.trim();
    }

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            isRadioSelected = true;
            break;
        }
    }
    
    const submitBtn = document.getElementById("submitBtn");

    if (submitBtn) {
        let isFormValid;

        if (travelerName !== "" && isRadioSelected)
        {
            isFormValid = true;
        } 
        else
        {
            isFormValid = false;
        }

        if (isFormValid)
        {
            submitBtn.disabled = false;
        } 
        else
        {
            submitBtn.disabled = true;
        }
    }
}

// עדכון תמונת יעד שנבחר
function handleDestinationChange(selectedRadio) {
    const selectedValue = selectedRadio.value;
    const destinationImg = document.getElementById("destinationImg");
    const destinationPreview = document.getElementById("destinationPreview");

    for (let i = 0; i < destinationImages.length; i++) {
        if (destinationImages[i].name === selectedValue) {
            if (destinationImg) {
                destinationImg.src = destinationImages[i].url;
            }
            break;
        }
    }

    if (destinationPreview) {
        destinationPreview.className = "destinationPreviewContainer";
    }

    checkFormValidity();
}

// עיצוב תמונת אטרקציה בסימון
function toggleAttractionImage(checkboxId, imgId) {
    const checkbox = document.getElementById(checkboxId);
    const img = document.getElementById(imgId);

    if (checkbox) {
        if (img) {
            if (checkbox.checked) {
                img.className = "attractionImg active";
            } else {
                img.className = "attractionImg dimmed";
            }
        }
    }
}

// שליחת הטופס והצגת סיכום
function handleSubmit(event)
{
    if (event) 
    {
        event.preventDefault();
    }

    const nameElem = document.getElementById("travelerName");
    let travelerName = "";
    if (nameElem)
    {
        travelerName = nameElem.value.trim();
    }

    const radioButtons = document.getElementsByName("destination");
    let selectedDestination = "";

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedDestination = radioButtons[i].value;
            break;
        }
    }

    const checkboxes = document.getElementsByName("attractions");
    let selectedAttractions = [];

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedAttractions[selectedAttractions.length] = checkboxes[i].value;
        }
    }

    let attractionsText;
    if (selectedAttractions.length === 0) {
        attractionsText = "לא נבחרו אטרקציות נוספות";
    } else {
        attractionsText = selectedAttractions.join(", ");
    }

    const summaryText = "שלום " + travelerName + "! חבילת החופשה שלך ל" + selectedDestination + " מוכנה.<br><br><strong>האטרקציות שבחרת:</strong> " + attractionsText + ".";

    const modalText = document.getElementById("modalText");
    const summaryModal = document.getElementById("summaryModal");

    if (modalText) {
        modalText.innerHTML = summaryText;
    }

    if (summaryModal) {
        summaryModal.className = "modal";
    }
}

// סגירת חלון הסיכום ואיפוס הטופס
function closeSummaryModal() {
    const summaryModal = document.getElementById("summaryModal");
    if (summaryModal) {
        summaryModal.className = "modal hidden";
    }

    // איפוס שדות הטופס
    const formElem = document.getElementById("tripPlannerForm");
    if (formElem) {
        formElem.reset();
    }

    // הסתרת תמונת היעד
    const destinationPreview = document.getElementById("destinationPreview");
    if (destinationPreview) {
        destinationPreview.className = "destinationPreviewContainer hidden";
    }

    // החזרת תמונות האטרקציות למצב מעומעם
    for (let i = 1; i <= 4; i++) {
        const img = document.getElementById("imgAttract" + i);
        if (img) {
            img.className = "attractionImg dimmed";
        }
    }

    // נעילת כפתור השליחה
    checkFormValidity();
}