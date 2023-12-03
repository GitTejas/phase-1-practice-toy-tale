let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  toyFormContainer.addEventListener("submit",(e) => {
    e.preventDefault()
    const name = document.querySelector('input[name=name]').value
    const image = document.querySelector('input[name=image').value 
    console.log(name)
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      })
    }
  fetch('http://localhost:3000/toys', option)
  .then(resp => resp.json())
  .then(data => addImg(data))
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function loadImg() {
  const postOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0    
    })
  }
  fetch('http://localhost:3000/toys', postOption)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach(element => {
        addImg(element);
      });
    })
    .catch(error => console.error('Error fetching toys:', error));
}

function addImg(element) {
  const div = document.createElement('div')
  const img = document.createElement('img')
  const button = document.createElement('button')
  const h2 = document.createElement('h2')
  const p = document.createElement('p')
  h2.innerText = element.name
  p.innerText = '0 likes'
  button.classList.add('like-btn')
  button.innerText = "Like"
  div.classList.add('card')
  img.classList.add('toy-avatar')
  img.src = element.image
  const source = document.querySelector("#toy-collection")
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
  source.appendChild(div)
  button.addEventListener("click", () => {
    let num = p.innerText.replace('likes', "")
    num = parseInt(num)
    num += 1
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        'likes': num
      })
    }
    fetch(`http://localhost:3000/toys/${element.id}`, options)
    p.innerText = `${num} likes`
  })
}
