const API_KEY = 'YOUR_OPEN_API_KEY';
const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("#prompt-input");
const imageSection = document.querySelector(".images-section");

const createLoadingIndicator = () => {
  const loadingIndicator = document.createElement("div");
  loadingIndicator.classList.add("loading-indicator");
  loadingIndicator.style.display = 'none'; // Initially hidden
  loadingIndicator.style.position = 'absolute'; // Adjust positioning as needed
  loadingIndicator.style.top = '0'; // Adjust positioning as needed
  loadingIndicator.style.left = '0'; // Adjust positioning as needed
  loadingIndicator.style.width = '100%'; // Adjust dimensions as needed
  loadingIndicator.style.height = '100%'; // Adjust dimensions as needed
  loadingIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Adjust appearance as needed
  loadingIndicator.innerHTML = '<span style="color: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">Loading...</span>'; // Add loading text

  document.body.appendChild(loadingIndicator);
  return loadingIndicator;
};

const loadingIndicator = createLoadingIndicator(); // Create the loading indicator element

const getImages = async () => {
  const prompt = inputElement.value.trim();

  if (!prompt) {
      alert("Please enter a prompt to generate images.");
      return;
  }

  try {
      loadingIndicator.style.display = 'block'; // Show loading indicator

      const options = {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${API_KEY}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              prompt: inputElement.value,
              n: 4,
              size: "1024x1024"
          })
      };
      const response = await fetch("https://api.openai.com/v1/images/generations", options);

      if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      //if (!data?.data?.length) {
        //  alert("No images were generated. Please try a different prompt.");
     // } else {
       //   imageSection.innerHTML = ''; // Clear previous images before adding new ones
     
           
       data.data.forEach(imageObject => {
              const imageContainer = document.createElement("div");
              imageContainer.classList.add("image-container");
              const imageElement = document.createElement("img");
              imageElement.setAttribute("src", imageObject.url);
              imageContainer.append(imageElement);
              imageSection.append(imageContainer);
          });
        

     // }
  } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later."); // Inform user about the error
  } finally {
      loadingIndicator.style.display = 'none'; // Hide loading indicator regardless of success or error
  }
};

submitIcon.addEventListener('click', getImages);

