// Dashboard Interactivity

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const searchInput = document.getElementById('search-input');
  const searchClearButton = document.getElementById('search-clear-button');
  const songsFilter = document.getElementById('songs-filter');
  const songList = document.getElementById('song-list');
  const songCards = document.querySelectorAll('.song-card');
  const emptyState = document.getElementById('empty-state');
  const emptyStateMessage = document.getElementById('empty-state-message');

  // Sample song data (for search/filter)
  const songs = [
    {
      id: 1,
      title: "Birthday Song for Mom",
      genre: "Country",
      status: "completed"
    },
    {
      id: 2,
      title: "Anniversary Love Song",
      genre: "Rock Ballad",
      status: "in-progress"
    },
    {
      id: 3,
      title: "Graduation Celebration",
      genre: "Hip Hop",
      status: "completed"
    }
  ];

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.trim().toLowerCase();
      
      // Show/hide clear button based on input
      searchClearButton.style.display = searchTerm ? 'block' : 'none';
      
      // Filter songs based on search term
      filterSongs(searchTerm, songsFilter.value);
    });
  }

  // Clear search button
  if (searchClearButton) {
    searchClearButton.addEventListener('click', function() {
      searchInput.value = '';
      searchClearButton.style.display = 'none';
      
      // Reset the filter
      filterSongs('', songsFilter.value);
    });
  }

  // Filter dropdown
  if (songsFilter) {
    songsFilter.addEventListener('change', function() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      filterSongs(searchTerm, this.value);
    });
  }

  /**
   * Filter songs based on search term and filter value
   */
  function filterSongs(searchTerm, filterValue) {
    let visibleCount = 0;
    
    songCards.forEach((card, index) => {
      if (index < songs.length) {
        const song = songs[index];
        
        // Check if song matches search term
        const titleMatch = song.title.toLowerCase().includes(searchTerm);
        
        // Check if song matches filter
        const filterMatch = 
          filterValue === 'All Songs' || 
          (filterValue === 'Completed' && song.status === 'completed') ||
          (filterValue === 'In Progress' && song.status === 'in-progress');
        
        // Show/hide card based on match
        if (titleMatch && filterMatch) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      }
    });
    
    // Show/hide empty state
    if (visibleCount === 0) {
      // Set appropriate message
      if (searchTerm) {
        emptyStateMessage.textContent = 'No songs match your search.';
      } else if (filterValue !== 'All Songs') {
        emptyStateMessage.textContent = `You don't have any ${filterValue.toLowerCase()} songs.`;
      } else {
        emptyStateMessage.textContent = 'You don\'t have any songs yet.';
      }
      
      emptyState.style.display = 'block';
      songList.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      songList.style.display = 'flex';
    }
  }

  // Buttons functionality
  document.querySelectorAll('.download-button').forEach(button => {
    button.addEventListener('click', function() {
      alert('Downloading song...');
      // Add actual download functionality here
    });
  });

  document.querySelectorAll('.view-lyrics-button').forEach(button => {
    button.addEventListener('click', function() {
      // Get the song title from the closest card
      const songTitle = this.closest('.song-card').querySelector('.song-title').textContent;
      alert(`Opening lyrics for: ${songTitle}`);
      // Redirect to lyrics page or open modal
    });
  });
});