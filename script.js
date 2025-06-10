document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('complaintForm');
    const complaintList = document.getElementById('complaintList');
    const heartsContainer = document.getElementById('hearts');
  
    let complaints = JSON.parse(localStorage.getItem('ayeshaComplaints')) || [];
  
    const renderComplaints = () => {
      complaintList.innerHTML = '';
      complaints.forEach((c) => {
        const li = document.createElement('li');
        li.className = 'bg-pink-50 p-4 rounded-lg shadow-md';
        li.innerHTML = `
          <p><strong>Date:</strong> ${c.date}</p>
          <p><strong>Mood:</strong> ${c.mood}</p>
          <p><strong>Complaint:</strong> ${c.message}</p>
          <p class="mt-2 italic text-pink-700">Auto-Reply: “Thy concern hath reached mine ears and shall not go unanswered.”</p>
        `;
        complaintList.appendChild(li);
      });
  
      if (complaints.length === 10 && !localStorage.getItem('achievementUnlocked')) {
        showToast("🎉 Achievement Unlocked: 10 noble grievances hath been registered!");
        localStorage.setItem('achievementUnlocked', true);
      }
    };
  
    function shootHearts() {
        const heartsContainer = document.getElementById('hearts');
      
        for (let i = 0; i < 1500; i++) {
          const heart = document.createElement('div');
          heart.className = 'heart';
      
          heart.style.left = `${Math.random() * 100}%`;
          heart.style.top = `${Math.random() * 100}%`;
          heart.style.width = `${10 + Math.random() * 20}px`;
          heart.style.height = `${10 + Math.random() * 20}px`;
          heart.style.background = `hsl(${Math.random() * 30 + 330}, 70%, 80%)`; // various pink shades
      
          heartsContainer.appendChild(heart);
      
          setTimeout(() => {
            heart.remove();
          }, 3000);
        }
      }
      
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent redirect
  
      const data = new FormData(form);
  
      // Submit to Formspree
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
  
      if (response.ok) {
        const now = new Date();
        complaints.push({
          mood: form.mood.value,
          message: form.message.value,
          date: now.toLocaleString()
        });
        localStorage.setItem('ayeshaComplaints', JSON.stringify(complaints));
        renderComplaints();
        shootHearts();
        form.reset();
        showToast("Grievance hath been submitted successfully, milady 🌹", "success");

      } else {
        showToast("Alas! Something went wrong. Try again?");
      }
    });
    function showToast(message, type = "success") {
        const toast = document.getElementById('toast');
        toast.textContent = message;
      
        // Set color based on type
        toast.classList.remove('bg-pink-200', 'bg-red-200', 'text-red-900', 'text-pink-900');
        if (type === "error") {
          toast.classList.add('bg-red-200', 'text-red-900');
        } else {
          toast.classList.add('bg-pink-200', 'text-pink-900');
        }
      
        // Show toast
        toast.style.opacity = 1;
        toast.style.transform = 'translate(-50%, -50%) scale(1)';
      
        // Hide after 4 seconds
        setTimeout(() => {
          toast.style.opacity = 0;
          toast.style.transform = 'translate(-50%, -50%) scale(0.9)';
        }, 4000);
      }
      
  
    renderComplaints();
  });
  