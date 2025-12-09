// Countdown timer for Muna's return date
document.addEventListener('DOMContentLoaded', function() {
    // Muna's return date: August 8, 2026
    const returnDate = new Date('August 8, 2026 18:00:00').getTime();
    
    // Countdown start date: December 10, 2025
    const startDate = new Date('December 10, 2025 00:00:00').getTime();
    
    // Update the countdown every second
    const countdownFunction = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Calculate the time remaining until return
        const distance = returnDate - now;
        
        // Calculate total duration from start to return
        const totalDuration = returnDate - startDate;
        
        // Calculate time passed since start
        const timePassed = now - startDate;
        
        // Calculate progress percentage
        let progressPercentage = (timePassed / totalDuration) * 100;
        
        // Ensure progress is between 0 and 100
        progressPercentage = Math.min(Math.max(progressPercentage, 0), 100);
        
        // If the return date has passed
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("days").innerHTML = "0";
            document.getElementById("hours").innerHTML = "0";
            document.getElementById("minutes").innerHTML = "0";
            document.getElementById("seconds").innerHTML = "0";
            document.getElementById("progress-bar").style.width = "100%";
            document.getElementById("progress-text").innerHTML = "Muna has returned home! Welcome back!";
            
            // Update title and add celebration
            document.querySelector(".title").innerHTML = "Muna is Home!";
            document.querySelector(".subtitle").innerHTML = "Welcome back to Ghana!";
            
            // Add celebration class
            document.body.classList.add("celebrate");
            
            // Update milestone status
            updateMilestones(100);
            return;
        }
        
        // Calculate days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the results
        document.getElementById("days").innerHTML = formatNumber(days);
        document.getElementById("hours").innerHTML = formatNumber(hours);
        document.getElementById("minutes").innerHTML = formatNumber(minutes);
        document.getElementById("seconds").innerHTML = formatNumber(seconds);
        
        // Update progress bar
        document.getElementById("progress-bar").style.width = progressPercentage + "%";
        document.getElementById("progress-text").innerHTML = Math.round(progressPercentage) + "% of countdown completed";
        
        // Update milestone status
        updateMilestones(progressPercentage);
        
        // Add animation to the numbers
        animateNumber("days", days);
        animateNumber("hours", hours);
        animateNumber("minutes", minutes);
        animateNumber("seconds", seconds);
        
    }, 1000);
    
    // Format numbers to always show two digits
    function formatNumber(num) {
        return num < 10 ? "0" + num : num;
    }
    
    // Function to add animation when numbers change
    function animateNumber(elementId, newValue) {
        const element = document.getElementById(elementId);
        const oldValue = parseInt(element.textContent);
        
        if (oldValue !== newValue) {
            element.classList.add("changed");
            setTimeout(() => {
                element.classList.remove("changed");
            }, 300);
        }
    }
    
    // Update milestone status based on progress
    function updateMilestones(progress) {
        const milestones = document.querySelectorAll('.milestone');
        
        milestones.forEach(milestone => {
            const percent = parseInt(milestone.getAttribute('data-percent'));
            
            if (progress >= percent) {
                milestone.classList.add('active');
            } else {
                milestone.classList.remove('active');
            }
        });
    }
    
    // Create floating elements dynamically
    createFloatingElements();
    
    // Function to create floating elements
    function createFloatingElements() {
        const container = document.querySelector('.floating-elements');
        const elementCount = 12;
        const symbols = ['✈', '🏠', '❤', '⭐', '🎉', '🌍'];
        
        for (let i = 0; i < elementCount; i++) {
            const element = document.createElement('div');
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            
            element.innerHTML = symbol;
            element.style.position = 'absolute';
            element.style.color = `rgba(74, 144, 226, ${Math.random() * 0.3 + 0.1})`;
            element.style.fontSize = `${Math.random() * 25 + 15}px`;
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            element.style.animation = `float ${Math.random() * 15 + 10}s linear infinite`;
            element.style.animationDelay = `${Math.random() * 10}s`;
            element.style.zIndex = '0';
            element.style.opacity = '0';
            
            container.appendChild(element);
        }
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .time-unit span.changed {
        animation: pulse 0.3s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    body.celebrate {
        animation: celebrate 3s infinite;
    }
    
    @keyframes celebrate {
        0%, 100% { background-color: #f5f7fa; }
        25% { background-color: #ffeaa7; }
        50% { background-color: #a29bfe; }
        75% { background-color: #81ecec; }
    }
    
    .milestone.active {
        background-color: rgba(46, 204, 113, 0.1);
        border-left: 4px solid #2ecc71;
    }
    
    .milestone.active .milestone-status {
        background-color: #2ecc71;
        box-shadow: 0 0 10px #2ecc71;
    }
    
    .milestone.active span {
        color: #2ecc71;
        font-weight: 600;
    }
`;
document.head.appendChild(style);
