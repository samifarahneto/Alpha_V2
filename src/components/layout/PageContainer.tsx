import { Box, BoxProps } from "@mui/material";

interface PageContainerProps extends BoxProps {
  children: React.ReactNode;
}

export default function PageContainer({
  children,
  ...props
}: PageContainerProps) {
  return (
    <Box
      sx={{
        width: "100%",
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
