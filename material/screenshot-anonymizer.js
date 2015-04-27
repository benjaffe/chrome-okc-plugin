// Anonymizes a profile page so screenshots can be taken
Array.prototype.forEach.call(document.querySelectorAll('#section_recent img, #section_matches img, #profile_thumbs img, #user_thumb img'),function(a){a.style.cssText = 'background: #aaaab6;content: "";display:block;';});
document.getElementById('basic_info_sn').textContent = 'Random_User';
document.getElementById('ajax_location').textContent = 'San Francisco, CA';
Array.prototype.forEach.call(document.querySelectorAll('#main_column .text div'),function(a){
   a.innerText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, itaque, ad accusamus non iste ea rem quo repudiandae officia veritatis perspiciatis voluptatum impedit nam perferendis facilis aperiam quidem sint magni.\n\nDolor, officia, dolorum, quod odio sint autem quas ipsam quis voluptatum veritatis laborum saepe quidem cupiditate hic porro possimus iusto itaque similique odit atque ea reprehenderit sapiente accusamus commodi libero.";
});