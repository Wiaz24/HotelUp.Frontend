import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { getCookMenus, publishCookMenu } from "../services/kitchenService";
import './../../../shared/components/staff/common.css';
import './cookMainPage.css';
import DishCookInfoComponent from "../components/DishCookInfoComponent";

function CookMainCookPage(){
  const auth = useAuth();
  const navigate = useNavigate();
  const userGroups: string[] = Array.isArray(auth.user?.profile["cognito:groups"])
    ? auth.user?.profile["cognito:groups"]
    : [];
  
  useEffect(() => {
    if (!auth.isAuthenticated || (!userGroups.includes("Cooks") && !userGroups.includes("Admins"))) {
      console.log(userGroups);
      navigate('/');
    }
    console.log('wita');
  }, [auth.isAuthenticated, navigate]);

  const { data } = useQuery({
    queryKey: ['get-cook-menus'],
    queryFn: () => getCookMenus(auth.user?.access_token ?? ""),
    enabled: !!auth.user?.access_token,
  });

  const { mutate } = useMutation({
    mutationKey: ['publish-cook-menu'],
    mutationFn: publishCookMenu,
    onSuccess: () => {
      alert("Pomyślnie opublikowano menu");
      navigate('/cook-details/');
    },
    onError: (error) => {
      alert("Wystąpił błąd: " + error.message);
    },
  });

  const handlePublish = (servingDate: string) => {
    if (auth.user?.access_token) {
      const token = auth.user.access_token;
      mutate({token, servingDate});
    } 
  };
  
  return(<div className="common-component">
    <div className='title'>Twoje dostępne menu:</div>
    <div className="elements-list">
    {data ? (
          data.map((menu, index) => (
            <div key={index} className="single-element"> 
              <div className="menu-info">
                <h4>Data serwowania: {menu.servingDate}</h4>
                {menu.dishes.map((dish, index) => (
                  <DishCookInfoComponent key={index} {...dish}></DishCookInfoComponent>
                ))}
              </div>
              <div> {menu.published ? <strong>Menu opublikowane</strong> : (
                <button onClick={() => handlePublish(menu.servingDate)} >Opublikuj menu</button>
              )} </div>
            </div>
          ))
        ) : (
          <p>Ładowanie danych...</p>
        )}
    </div>
  </div>);
}
export default CookMainCookPage;