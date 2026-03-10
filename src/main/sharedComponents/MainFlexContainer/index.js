import styled from "styled-components";

/* App level main flex wrapper */
export const MainFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

/* Header + filter + listing wrapper */
export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
   gap: 10px;
`;


/* Content body*/


export const ContBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 12px;
  padding-bottom: 16px;

  /* Hide scrollbar — Chrome, Edge, Safari */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  /* Hide scrollbar — Firefox */
  scrollbar-width: none;

  /* Hide scrollbar — IE / old Edge */
  -ms-overflow-style: none;
`;


