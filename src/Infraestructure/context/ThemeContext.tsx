// import { createTheme, ThemeProvider } from "@mui/material/styles";
// interface ThemeContextProps {
//   children?: React.ReactNode;
//   dark?: boolean;
// }
// const lightTheme = createTheme({ palette: { mode: "light" } });
// const darkTheme = createTheme({ palette: { mode: "dark" } });

// export default function ThemeContext({ children?, dark}:ThemeContextProps{
//   return(
//     <>
//   <ThemeProvider theme={dark ? darkTheme : lightTheme}>{children}</ThemeProvider>
//   </>)

// };

import { createTheme, ThemeProvider } from "@mui/material/styles";

interface ThemeContextProps {
  children?: React.ReactNode;
  dark?: boolean;
}

const lightTheme = createTheme({ palette: { mode: "light" } });
const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function ThemeContext({ children, dark }: ThemeContextProps) {
  return (
    <>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>{children}</ThemeProvider>
    </>
  );
}
